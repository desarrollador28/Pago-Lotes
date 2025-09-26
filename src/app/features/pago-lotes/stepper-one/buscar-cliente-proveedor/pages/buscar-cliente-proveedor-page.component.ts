import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, finalize, Subject, switchMap, tap } from 'rxjs';
import { DropdownChangeEvent, DropdownFilterEvent } from 'primeng/dropdown';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { BuscarClienteProveedorService } from '../../../../../core/services/pago-lotes/buscar-cliente.service';
import { SessionService } from '../../../../../core/services/pago-lotes/session.service';
import { ViewportService } from '../../../../../core/services/viewport.service';
import { resetFieldsForm, toggleFields, isInvalidField, getValidationMessage, toggleValidators } from '../../../../../shared/helpers/form.helpers';
import { ParamsIngresos, Clientes, Proveedores, StateOptions, Params, Pagination, Proveedor, Cliente } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';

@Component({
  selector: 'pago-lotes-buscar-cliente-proveedor',
  standalone: false,
  templateUrl: './buscar-cliente-proveedor-page.component.html',
  styleUrl: './buscar-cliente-proveedor-page.component.css'
})
export class BuscarClienteProveedorPageComponent {
  //Eventos enviados al stepper
  @Output() isValidSearch = new EventEmitter<boolean>();
  @Output() queryParmasIngresos = new EventEmitter<ParamsIngresos>();

  //Obsevable para buscar en el api
  private filtro$ = new Subject<string>();
  private isCliente$ = new Subject<boolean>();

  public dropdownClienteProveedor: Clientes | Proveedores | undefined;
  public formCliente!: FormGroup;
  private regexpDigito: RegExp = /\d+/;
  public isMobile: boolean = false;
  public lblDropdownClienteProveedor: string = 'Seleccionar una opción';
  public placeHolderBtnClienteProveedor: string = 'Ingresar ID'
  public loadingDropdownClienteProveedor: boolean = false;
  public loadingDropdownBancos: boolean = false;
  public isCliente: boolean = false;
  public pagination: Pagination = {
    pageSize: 10,
    pageNumber: 1
  };
  public dropdownBancos: SelectItemGroup[] = [];
  public ingresoCuentaCorriente: StateOptions[] =
    [
      {
        label: 'Ingreso',
        value: '1'
      },
      {
        label: 'Cuenta Corriente',
        value: '2'
      },

    ];

  //Opciones SelectButton
  public stateOptions: StateOptions[] = [
    { label: 'Proveedor', value: '1' },
    { label: 'Cliente', value: '2' }
  ];

  private queryParams: Params = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
  };

  private fieldsForm: string[] = [
    'tipoProveedorCliente',
    'proveedorCliente',
    'ingresoCuentaCorriente',
    'bancos',
    'dateMin',
    'dateMax',
    'idIngreso',
    'idProveedorCliente',
  ];

  public ingresosParams: ParamsIngresos = {
    idCliente: null,
    idCuentaBancaria: null,
    idProveedor: null
  };


  constructor(
    private fb: FormBuilder,
    private viewPortService: ViewportService,
    private buscarClienteService: BuscarClienteProveedorService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.searchClienteOrProveedor$();
    this.initClientesOrProveedoresListener();
    this.initForm();
    this.viewPortService.viewportWidth$.subscribe(width => {
      this.isMobile = width < 768;
    });
  }

  private initForm(): void {
    this.formCliente = this.fb.group({
      tipoProveedorCliente: ['', [Validators.required]],
      listProveedorCliente: ['', [Validators.required]],
      ingresoCuentaCorriente: ['', [Validators.required]],
      bancos: ['', [Validators.required]],
      dateMin: ['', []],
      dateMax: ['', []],
      idIngreso: [null, [Validators.pattern(this.regexpDigito)]],
      idProveedorCliente: [null, [Validators.required, Validators.pattern(this.regexpDigito)]],
    });
  }

  /**
 * TODO: PASO 1
 * Obtener el tipo de cliente seleccionado
 * @param event SelectButtonOptionClickEvent
 * 1 = Proveedor
 * 2 = Cliente
 * @return void
 */
  selectedTipoCliente(event: SelectButtonOptionClickEvent): void {
    this.isValidSearch.emit(false);
    const tipoCliente: string = event.option.value;
    this.queryParams.searchTerm = '';
    this.lblDropdownClienteProveedor = tipoCliente === '1' ? 'Seleccionar Proveedor' : 'Seleccionar Cliente';
    this.placeHolderBtnClienteProveedor = tipoCliente === '1' ? 'Ingresar ID Proveedor' : 'Ingresar ID Cliente';
    this.isCliente = tipoCliente !== '1' ? true : false;
    const fieldsReset: string[] = this.fieldsForm.filter(field => field !== 'tipoProveedorCliente');
    resetFieldsForm(this.formCliente, fieldsReset);
    this.isCliente$.next(this.isCliente);
  }

  /**
   * Obtener cliente o proveeedor, dependiento del tipo de selección
   * Reacciona al observable isCliente$
   * Nota: solo se llama una vez para evitar fugas de memoria
   * @return void
   */
  private initClientesOrProveedoresListener(): void {
    this.isCliente$.pipe(
      tap(() => this.loadingDropdownClienteProveedor = true),
      switchMap(flag => this.buscarClienteService.getClientesProveedores(this.queryParams, flag).pipe(
        finalize(() => this.loadingDropdownClienteProveedor = false))),
    ).subscribe({
      next: ({ data, pagination }) => {
        this.pagination = pagination;
        this.dropdownClienteProveedor = this.isCliente ? data as Clientes : data as Proveedores;
      },
      error: (err) => {
        console.log('Error en obtener datos', err);
      }
    })
  }

  /**
   * Listado de bancos
   * Llena el dropdown bancos
   * @return void
   */
  getBancos(): void {
    this.buscarClienteService.getBancos().pipe(
      tap(() => this.loadingDropdownBancos = true),
      finalize(() => this.loadingDropdownBancos = false)
    ).subscribe({
      next: (response) => {
        const bancos = (response.payload ?? []) as Array<{
          idBanco: number;
          nombre: string;
          cuentas: Array<{ idCuenta: number; numeroCuenta: string }>;
        }>;

        // transformar a grupos para PrimeNG
        this.dropdownBancos = bancos.map(banco => ({
          label: banco.nombre, // título del grupo
          // cada cuenta se vuelve un SelectItem con label/value
          items: banco.cuentas.map(cuenta => ({
            label: cuenta.numeroCuenta,
            value: {
              idCuenta: cuenta.idCuenta,
              numeroCuenta: cuenta.numeroCuenta,
              idBanco: banco.idBanco,
              banco: banco.nombre,
            },
            banco: banco.nombre,
          })) as SelectItem[]
        })) as SelectItemGroup[];
      },
      error: (err) => {
        console.log(`Error en listado de bancos, ${err}`);
      }
    });
  }

  /**
   * Código de busqueda via API (clientes/proveedores)
   * Reacciona al metodo searchClienteOrProveedor()
   * NOTA: solo se llama una vez para evitar fugas de memoria
   */
  private searchClienteOrProveedor$(): void {
    this.filtro$
      .pipe(
        debounceTime(800),
        tap(searchTerm => {
          this.queryParams.searchTerm = searchTerm;
        }),
        switchMap(
          () => this.buscarClienteService.getClientesProveedores(this.queryParams, this.isCliente).pipe(
            finalize(() => this.loadingDropdownClienteProveedor = false))
        )
      ).subscribe({
        next: (response) => {
          this.dropdownClienteProveedor = response.data;
        },
        error: (err) => {
          console.error(`Error en la busqueda: ${err}`);
        }
      });
  }

  /**
   * Evento filter Dropdown (clientes/proveedor)
   * Ejecuta el metodoto searchClienteOrProveedor$()
   * @param eventFilter: DropdownFilterEvent
   */
  searchClienteOrProveedor(eventFilter: DropdownFilterEvent): void {
    this.loadingDropdownClienteProveedor = true;
    this.filtro$.next(eventFilter.filter);
  }

  /**
   * Bloquear select bancos si es cuenta corriente
   * @param event: DropdownChangeEvent
   * @return void
   */
  eventIngresoCuentaCorriente(event: DropdownChangeEvent): void {
    const valueEvent: DropdownChangeEvent = event.value;
    resetFieldsForm(this.formCliente, 'bancos');

    if (valueEvent.value === '1') {
      this.getBancos();
      toggleFields(this.formCliente, 'bancos', true);
    } else {
      toggleFields(this.formCliente, 'bancos', false);
    }

  }


  /**
   * Enlazar busqueda por id con dropdown cliente/proveedor
   * @param id: number
   * @return void
   */
  getClienteOrProveedorById(id: number): void {
    this.buscarClienteService.getClienteOrProveedorById(id, this.isCliente).pipe(
      tap(() => this.loadingDropdownClienteProveedor = true),
      finalize(() => this.loadingDropdownClienteProveedor = false)
    ).subscribe({
      next: (response) => {
        const controlDropdownClienteProveedor = this.formCliente.get('listProveedorCliente');

        if (!this.isCliente) {
          const proveedorFind: Proveedor = response as Proveedor;
          this.dropdownClienteProveedor = this.dropdownClienteProveedor as Proveedores
          const proveedor = proveedorFind.payload;
          this.dropdownClienteProveedor
          const existId = this.dropdownClienteProveedor.payload.some(p => p.provId === proveedor.provId);
          if (!existId) this.dropdownClienteProveedor.payload.push(proveedor);
        } else {
          const clientFind = response as Cliente;
          this.dropdownClienteProveedor = this.dropdownClienteProveedor as Clientes;
          const cliente = clientFind.payload;
          const existId = this.dropdownClienteProveedor.payload.some(c => c.idCliente === cliente.idCliente);
          if (!existId) this.dropdownClienteProveedor.payload.push(cliente);
        }


        controlDropdownClienteProveedor!.setValue(response.payload);
      },
      error: (err) => {
        if (err.status === 404) {
          const controlDropdownClienteProveedor = this.formCliente.get('listProveedorCliente');
          const text = this.isCliente ? 'Cliente no encontrado' : 'Proveedor no encontrado';
          controlDropdownClienteProveedor!.reset();
          Swal.fire({
            icon: "error",
            title: 'Busqueda por ID',
            text,
            confirmButtonColor: '#d33',
            // confirmButtonText: ''
          });
        }
        console.log(`Error en la busqueda por ID ${err}`)
      }
    })
  }

  /**
 * Obtener errores de validación
 * @param field string
 * @returns boolean
 */
  isValidField = (field: string): boolean => isInvalidField(this.formCliente, field)

  /**
* Mostrar errores de validación
* @param field string
* @returns string | null
*/
  getFieldError(field: string): string | null {
    const errorId = this.isCliente ? '*ID de cliente no válido'
      : '*ID de proveedor no válido';

    return getValidationMessage(
      this.formCliente,
      field,
      {
        tipoCliente: {
          required: '*Selecciona una opción (cliente o proveedor)'
        },
        dateMin: {
          required: '*Selecciona una fecha de inicio'
        },
        dateMax: {
          required: '*Selecciona una fecha de fin'
        },
        idProveedorCliente: {
          pattern: errorId
        },
      }
    );
  }

  /**
   * Buscar por id cliente/proveedor
   * Dispara el metodo getClienteOrProveedorById()
   * @return void
   */
  onSearchClienteOrProveedor(): void {
    const controlIdProveedorCliente = this.formCliente.get('idProveedorCliente');
    const controlTipoCliente = this.formCliente.get('tipoProveedorCliente');

    if (!controlIdProveedorCliente || !controlTipoCliente) return;

    if (controlIdProveedorCliente.invalid || controlTipoCliente.invalid) {
      controlIdProveedorCliente.markAsTouched();
      controlTipoCliente.markAsTouched();
      return;
    }
    const id: number = controlIdProveedorCliente.value.trim();
    this.getClienteOrProveedorById(id);
  }

  /**
   * Evento change dropdownClienteProveedor
   * @param $event DropdownChangeEvent
   * @return void
   */
  onChangeDropdownClienteProveedor($event: DropdownChangeEvent): void {
    const event: DropdownChangeEvent = $event.value;

    if (!event) return;

    toggleValidators(this.formCliente, 'idProveedorCliente', Validators.required);
  }


  /**
   * Disparar busqueda de ingresos bancarios
   * @return void
  */
  onSearchIngresos(): void {
    if (this.formCliente.invalid) {
      this.formCliente.markAllAsTouched();
      return;
    }

    const formControls = this.formCliente.value;
    const isCuentaCorriente = formControls.ingresoCuentaCorriente;
    const datePipe = new DatePipe('en-US');
    const formattedDateMin = datePipe.transform(formControls.dateMin, 'yyyy/MM/dd') ?? '';
    const formattedDateMax = datePipe.transform(formControls.dateMax, 'yyyy/MM/dd') ?? '';

    this.ingresosParams.dateMin = formattedDateMin;
    this.ingresosParams.dateMax = formattedDateMax;
    this.ingresosParams.idCuentaBancaria = isCuentaCorriente.value !== '2' ? formControls.bancos.idCuenta : null;
    this.ingresosParams.idCliente = !this.isCliente ? null : formControls.listProveedorCliente.idCliente;
    this.ingresosParams.idProveedor = !this.isCliente ? formControls.listProveedorCliente.provId : null;

    this.sessionService.set('objectPaso1', JSON.stringify(formControls));

    this.queryParmasIngresos.emit({
      ...this.ingresosParams,
      dateMin: formattedDateMin,
      dateMax: formattedDateMax,
    });
    this.isValidSearch.emit(true);

  }
}
