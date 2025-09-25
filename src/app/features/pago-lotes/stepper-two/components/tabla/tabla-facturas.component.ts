import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CreatePaymentBatchRequest, Items, PayloadClientes, PayloadFactura, PayloadIngresos, PayloadProveedores } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { CustomColumn } from '../../../interfaces/table.interface';
import { SessionService } from '../../../../../core/services/pago-lotes/session.service';
import { FacturasService } from '../../../../../core/services/pago-lotes/facturas.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';


interface ObjectPaso1 {
  tipoProveedorCliente: number;
  listProveedorCliente: PayloadClientes | PayloadProveedores;
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

  @Input() facturas: PayloadFactura[] = [];
  public columns: CustomColumn[] = [];
  public total: number = 0;
  public createPaymentBatchRequest: CreatePaymentBatchRequest = {
    partyType: 0,
    mode: 0,
    entityId: 0,
    idIngreso: 0,
    items: [],
  };
  public ingresoBancario: PayloadIngresos = {
    idIngreso: 0,
    importe: 0,
    fecha: new Date(),
    referencia: '',
    saldo: 0
  }


  constructor(
    private sessionService: SessionService,
    private facturasService: FacturasService
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
    console.log('Cambio')
    if (changes['facturas']) {
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

  deleteFactura(rowData: PayloadFactura): void {
    this.facturas = this.facturas.filter(f => f.idFactura !== rowData.idFactura);
    this.calculateTotal();
  }

  updateSaldo() {
    this.calculateTotal();
  }

  //TODO: Consumir API para aplicar pagos
  aplicarPagos(): void {
    const objecPaso1 = this.sessionService.get('objectPaso1');
    const ingresoSelect = this.sessionService.get('ingresoBancarioSelected');


    if (!objecPaso1 || !ingresoSelect) return;


    const request: ObjectPaso1 = JSON.parse(objecPaso1);
    this.ingresoBancario = JSON.parse(ingresoSelect);

    this.createPaymentBatchRequest.partyType = Number(request.tipoProveedorCliente);
    this.createPaymentBatchRequest.mode = Number(request.ingresoCuentaCorriente.value);
    this.createPaymentBatchRequest.idIngreso = this.ingresoBancario.idIngreso;

    if (request.tipoProveedorCliente == 1) {
      const proveedor = request.listProveedorCliente as PayloadProveedores
      this.createPaymentBatchRequest.entityId = proveedor.provId;
    } else {
      const cliente = request.listProveedorCliente as PayloadClientes;
      this.createPaymentBatchRequest.entityId = cliente.idCliente;
    }

    const items: Items[] = this.facturas.map(i => ({
      facId: i.idFactura,
      pagoNetoFac: i.totalNeto,
    }));

    this.createPaymentBatchRequest.items = items;

    this.createPaymentBatch();
  }

  createPaymentBatch(): void {
    this.facturasService.createPaymentBatch(this.createPaymentBatchRequest).pipe(
      //TODO: aplicar pipes
    ).subscribe({
      next: ({ data, location }) => {
        //TODO: pago en proceso en el texto de la alerta
        Swal.fire({
          title: "Aplicar Pagos",
          text: 'Pagos aplicados con éxito',
          icon: "success",
          draggable: true
        });
        this.getBatchStatus(data.id);
        // Swal.fire({
        //   title: "<strong>Pago Aplicado</u></strong>",
        //   icon: "success",
        //   html: `<a href="${location}" autofocus>URL</a>`,
        //   showCloseButton: true,
        //   showCancelButton: true,
        //   focusConfirm: false,
        //   confirmButtonText: `Listo`,
        // });
      },
      error: (err) => {
        console.log('Error en aplicar pagos', err);
      }
    })
  }

  getBatchStatus(id: number): void {
    this.facturasService.getBatchStatus(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log('Error en status de pagos', err);
      }
    })
  }

}
