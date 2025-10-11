import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Cliente, CreatePaymentBatchRequest, Factura, Facturas, GetBatchStatus, Ingreso, Items, Proveedor } from '../../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { CurrencyPipe } from '@angular/common';
import { CustomColumn } from '../../../../interfaces/table.interface';
import { SessionService } from '../../../../../../core/services/pago-lotes/session.service';
import { FacturasService } from '../../../../../../core/services/pago-lotes/facturas.service';
import Swal from 'sweetalert2';
import { restrictNegativeValues } from '../../../../../../shared/helpers/form.helpers';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { TablePageEvent } from 'primeng/table';
import { Router } from '@angular/router';


interface ObjectPaso1 {
  tipoProveedorCliente: number;
  listProveedorCliente: Cliente | Proveedor;
  ingresoCuentaCorriente: IngresoCuentaCorriente;
  idProveedorCliente: number | null;
  dateMin: null;
  dateMax: null;
  idIngreso: null;
}
interface IngresoCuentaCorriente {
  label: string;
  value: number;
}

@Component({
  selector: 'tabla-facturas',
  standalone: false,
  templateUrl: './tabla-facturas.component.html',
  styleUrl: './tabla-facturas.component.css'
})
export class TablaFacturasComponent implements OnInit, OnChanges {
  @Input() facturas: Facturas['payload'] = [];
  public columns: CustomColumn[] = [];
  public total: number = 0;
  public limiSaldo: number = 0;
  public rows: number = 5;
  public first: number = 0;
  public createPaymentBatchRequest: CreatePaymentBatchRequest = {
    partyType: 0,
    mode: 0,
    entityId: 0,
    idIngreso: 0,
    items: [],
  };
  public ingresoBancario!: Ingreso['payload'];

  constructor(
    private currencyPipe: CurrencyPipe,
    private sessionService: SessionService,
    private facturasService: FacturasService,
  ) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'idFactura', header: 'Folio' },
      { field: 'totalNeto', header: 'Importe', pipe: 'currency' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'concepto', header: 'Concepto' },
      { field: 'saldo', header: 'Saldo', pipe: 'currency' },
      { field: 'accion', header: 'Acción' }
    ];

    this.sessionService.watch('ingresoBancarioSelected').subscribe(ingresoBancarioSelected => {
      const ingresoSelect = ingresoBancarioSelected;
      this.ingresoBancario = JSON.parse(ingresoSelect!);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['facturas']) {
      this.facturas = this.facturas.map(f => ({
        ...f,
        saldoOriginal: f.saldo,
      }));
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    if (this.facturas.length === 0) return;

    let total = 0;
    for (let factura of this.facturas) {
      total += factura.saldo;
    }

    this.total = total;
  }

  deleteFactura(rowData: Factura['payload']): void {
    this.facturas = this.facturas.filter(f => f.idFactura !== rowData.idFactura);
    this.calculateTotal();
  }

  updateSaldoInput(row: Factura['payload'], event: InputNumberInputEvent): void {
    const saldo = event.value ?? 0;
    const index = this.facturas.findIndex(f => f.idFactura === row.idFactura);

    if (index === -1) return;

    if (Number(saldo) <= 0) this.facturas[index].saldo = 0;

    const limit = this.facturas[index].saldoOriginal;
    if (parseFloat(saldo.toString()) > limit) {
      this.facturas[index].saldo = limit;

    }
    this.calculateTotal();
  }

  preventNegative(event: KeyboardEvent): void {
    restrictNegativeValues(event);
  }


  //TODO: Consumir API para aplicar pagos
  aplicarPagos(): void {
    const objecPaso1 = this.sessionService.get('objectPaso1');
    const ingresoSelect = this.sessionService.get('ingresoBancarioSelected');
    const ingresoBancario = JSON.parse(ingresoSelect!);

    const saldoFormat = this.currencyPipe.transform(ingresoBancario.saldo, 'USD', 'symbol', '1.2-2');
    if (this.total > ingresoBancario.saldo) {
      Swal.fire({
        title: `Error en Aplicar Facturas`,
        icon: "error",
        text: `El Total de Aplicaciones supera el saldo de: ${saldoFormat}`
      });
      return;
    }

    if (!objecPaso1 || !ingresoSelect) return;


    const request: ObjectPaso1 = JSON.parse(objecPaso1);
    this.ingresoBancario = JSON.parse(ingresoSelect);

    this.createPaymentBatchRequest.partyType = Number(request.tipoProveedorCliente);
    this.createPaymentBatchRequest.mode = Number(request.ingresoCuentaCorriente.value);
    this.createPaymentBatchRequest.idIngreso = this.ingresoBancario.idIngreso;

    if (request.tipoProveedorCliente == 1) {
      const proveedor = request.listProveedorCliente as unknown as Proveedor['payload'];
      this.createPaymentBatchRequest.entityId = proveedor.provId;
    } else {
      const cliente = request.listProveedorCliente as unknown as Cliente['payload'];
      this.createPaymentBatchRequest.entityId = cliente.idCliente;
    }

    const items: Items[] = this.facturas.map(i => ({
      facId: i.idFactura,
      pagoNetoFac: i.saldo,
    }));

    this.createPaymentBatchRequest.items = items;

    this.createPaymentBatch();
  }

  createPaymentBatch(): void {
    this.facturasService.createPaymentBatch(this.createPaymentBatchRequest).pipe(
      //TODO: aplicar pipes
    ).subscribe({
      next: ({ data }) => {
        //TODO: pago en proceso en el texto de la alerta
        Swal.fire({
          title: "Aplicar Pagos",
          text: 'Pagos aplicados con éxito',
          icon: "success",
          draggable: true,
          confirmButtonText: 'Consultar estado',
        }).then(() => {
          this.sessionService.set('batchID', String(data.id))
          this.sessionService.remove(['objectPaso1', 'ingresoBancarioSelected']);
          this.facturas = [];
        });

      },
      error: (err) => {
        console.log('Error en aplicar pagos', err);
      }
    })
  }

  pageChange(event: TablePageEvent): void {
    this.rows = event.rows;
    this.first = event.first;
  }

}
