import { Component, Input, OnInit } from '@angular/core';
import { Column, TableDialog } from '../../components/dialog/interfaces/dialog.interface';
import { BuscarClienteProveedorService } from '../../../../core/services/pago-lotes/buscar-cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, CreatePaymentBatchRequest, Factura, Items, Params, PayloadClientes, PayloadFactura, PayloadIngresos, PayloadProveedores } from '../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { catchError, debounce, debounceTime, finalize, map, of, Subject, switchMap, tap } from 'rxjs';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CustomColumn } from '../../components/tabla/interfaces/table.interface';
import { SessionService } from '../../../../core/services/pago-lotes/session.service';

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
  selector: 'pago-lotes-documentos-cobranza-page',
  standalone: false,
  templateUrl: './documentos-cobranza-page.component.html',
  styleUrl: './documentos-cobranza-page.component.css'
})
export class DocumentosCobranzaPageComponent implements OnInit {


  public idCliente: number = 0;
  public formDocumentosCobranza!: FormGroup;
  private regexpDigito: RegExp = /\d+/;
  private filtro$ = new Subject<number>();
  public columns: CustomColumn[] = [];
  public loading: boolean = false;
  public facturas: PayloadFactura[] = [];
  public isValidtotalFacturas: boolean = false;
  public ingresoBancario: PayloadIngresos = {
    idIngreso: 0,
    importe: 0,
    fecha: new Date(),
    referencia: '',
    saldo: 0
  }
  public createPaymentBatchRequest: CreatePaymentBatchRequest = {
    partyType: 0,
    mode: 0,
    entityId: 0,
    idIngreso: 0,
    items: []
  };
  public total: number = 0;
  public selectFactura: PayloadFactura | null = {
    idFactura: 0,
    fecha: new Date(),
    factura: '',
    cliente: '',
    contratoAnexo: '',
    concepto: '',
    saldo: 0,
    totalNeto: 0
  }
  public queryParams: Params = {
    searchTerm: '',
    pageSize: 10,
    pageNumber: 1
  }
  public clienteTable: TableDialog = {
    label: '',
    roudend: true,
    icon: 'pi pi-search',
    title: 'Buscar clientes',
    isCliente: true
  }

  public facturasTable: TableDialog = {
    label: 'Facturas',
    roudend: false,
    title: 'Importe a Aplicar',
    isCliente: false
  }

  constructor(
    private fb: FormBuilder,
    private clienteService: BuscarClienteProveedorService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {

    this.formDocumentosCobranza = this.fb.group({
      idCliente: [null, Validators.pattern(this.regexpDigito)],
      nombre: ['', [Validators.required]],
      rfc: [''],
    });
    this.getClienteById$();

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


  /**
   * Buscar cliente por IO
   * @returns void
   */
  getClienteById$(): void {
    this.filtro$
      .pipe(
        debounceTime(600),
        switchMap((id) =>
          this.clienteService.getClienteOrProveedorById(id, true).pipe(
            catchError((err) => {
              console.log('Error en búsqueda de cliente', err);
              return of(null);
            })
          )
        ),
        finalize(() => this.loading = false),
      )
      .subscribe((response) => {
        if (!response) return;

        const { payload: cliente } = response as Cliente;
        const control = this.formDocumentosCobranza.get('nombre');
        if (!control) return;

        this.idCliente = cliente.idCliente;
        control.setValue(cliente.nombre);
      });
  }
  /**
   * Evento para busqueda por ID
   * @param event InputNumberInputEvent
   * @returns void
   */
  filterById(event: InputNumberInputEvent): void {
    this.loading = true;
    const control = this.formDocumentosCobranza.get('nombre');

    if (!control) return;

    if (!event.value) {
      control.reset();
      return;
    }

    this.filtro$.next(Number(event.value));
  }

  eventClienteSelected(eventCliente: PayloadClientes): void {
    this.formDocumentosCobranza.setValue(eventCliente);
    this.idCliente = eventCliente.idCliente;
  }

  //Obtener facturas para llenar tabla
  facturasShowTable(event: PayloadFactura[]): void {
    this.facturas = event;
    this.calculateTotal();
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

    this.createPaymentBatchRequest.partyType = request.tipoProveedorCliente;
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


  }
}
