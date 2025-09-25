import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, debounce, debounceTime, finalize, map, of, Subject, switchMap, tap } from 'rxjs';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { SessionService } from '../../../../../core/services/pago-lotes/session.service';
import { BuscarClienteProveedorService } from '../../../../../core/services/pago-lotes/buscar-cliente.service';
import { Cliente, CreatePaymentBatchRequest, Items, Params, PayloadClientes, PayloadFactura, PayloadIngresos, PayloadProveedores } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { TableDialog } from '../../interfaces/dialog.interface';
import { CustomColumn } from '../../../interfaces/table.interface';
import { getValidationMessage, isInvalidField } from '../../../../../shared/helpers/form.helpers';

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
      idCliente: [null, [Validators.required, Validators.pattern(this.regexpDigito)]],
      nombre: [{ value: null, disabled: true }],
      rfc: [''],
    });
    this.getClienteById$();

    this.sessionService.watch('ingresoBancarioSelected').subscribe(ingresoBancarioSelected => {
      const ingresoSelect = ingresoBancarioSelected;
      this.ingresoBancario = JSON.parse(ingresoSelect!);
    })
  }


  /**
   * Buscar cliente por IO
   * Reacciona a getClienteById()
   * Nota: solo se manda a llamar una vez para evitar fujas de memoria
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
  getClienteById(event: InputNumberInputEvent): void {
    this.loading = true;
    const control = this.formDocumentosCobranza.get('nombre');

    if (!control) return;

    if (!event.value) {
      control.reset();
      return;
    }

    this.filtro$.next(Number(event.value));
  }


  /**
   * Enlazar input id y nombre con la seleccion en el modal de clientes
   * @param eventCliente
   * @return void
   */
  eventClienteSelected(eventCliente: PayloadClientes): void {
    this.formDocumentosCobranza.setValue(eventCliente);
    this.idCliente = eventCliente.idCliente;
  }

  //Obtener facturas para llenar tabla
  facturasShowTable(event: PayloadFactura[]): void {
    this.facturas = event;
  }

  /**
 * Obtener errores de validación
 * @param field
 * @returns boolean
 */
  isValidField = (field: string): boolean => isInvalidField(this.formDocumentosCobranza, field)

  /**
* Mostrar errores de validación
* @param field
* @returns string
*/
  getFieldError(field: string): string | null {
    return getValidationMessage(
      this.formDocumentosCobranza,
      field,
      {
        idCliente: {
          pattern: 'Ingresar un ID de cliente valido'
        },
      }
    );
  }


}
