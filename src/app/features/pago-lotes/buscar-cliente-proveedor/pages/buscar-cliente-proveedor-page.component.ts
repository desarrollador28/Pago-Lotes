import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, switchMap, tap } from 'rxjs';
import { DropdownChangeEvent, DropdownFilterEvent } from 'primeng/dropdown';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import Swal from 'sweetalert2';

import { ViewportService } from '../../../../core/services/viewport.service';
import { getValidationMessage, isInvalidField, resetFieldsForm, toggleFields, toggleValidators } from '../../../../shared/helpers/form.helpers';
import { BuscarClienteProveedorService } from '../../../../core/services/pago-lotes/buscar-cliente.service';
import { Clientes, Params, StateOptions, Proveedores, ParamsIngresos, Ingresos, Pagination, PayloadProveedores, PayloadClientes } from '../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { DatePipe } from '@angular/common';
import { SessionService } from '../../../../core/services/pago-lotes/session.service';

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

  public dropdownClienteProveedor: Clientes | Proveedores | undefined;
  public formCliente!: FormGroup;
  private regexpDigito: RegExp = /\d+/;
  public isMobile: boolean = false;
  public lblDropdownClienteProveedor: string = 'Seleccionar una opción';
  public placeHolderBtnClienteProveedor: string = 'Ingresar ID'
  public loadingDropdownClienteProveedor: boolean = false;
  public loadingDropdownBancos: boolean = false;
  public isCliente: boolean = false;
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
    this.filterApi$();
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

    this.viewPortService.viewportWidth$.subscribe(width => {
      this.isMobile = width < 768;
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
    const tipoCliente: string = event.option.value;
    this.isValidSearch.emit(false);
    this.lblDropdownClienteProveedor = tipoCliente === '1' ? 'Seleccionar Proveedor' : 'Seleccionar Cliente';
    this.placeHolderBtnClienteProveedor = tipoCliente === '1' ? 'Ingresar ID Proveedor' : 'Ingresar ID Cliente';
    this.queryParams.searchTerm = '';
    const fieldsReset: string[] = this.fieldsForm.filter(field => field !== 'tipoProveedorCliente');
    resetFieldsForm(this.formCliente, fieldsReset);
    if (tipoCliente !== '1') {
      this.isCliente = true;
      this.getClientes();
    } else {
      this.isCliente = false;
      this.getProveedores();
    }
  }

  /**
   *
   * Listaado de clientes paginado
   */
  getClientes(): void {
    this.loadingDropdownClienteProveedor = true;
    this.buscarClienteService.getClientesProveedores(this.queryParams, this.isCliente)
      .subscribe({
        next: (response) => {
          this.dropdownClienteProveedor = response.data;
        },
        complete: () => {
          this.loadingDropdownClienteProveedor = false;
        },
        error: (err) => {
          this.loadingDropdownClienteProveedor = false;
          console.log(`Error en listado de clientes, ${err}`);
        }
      });
  }

  //Listado de proveedores paginado
  getProveedores(): void {
    this.loadingDropdownClienteProveedor = true;
    this.buscarClienteService.getClientesProveedores(this.queryParams, this.isCliente).subscribe({
      next: (response) => {
        this.dropdownClienteProveedor = response.data;
      },
      complete: () => {
        this.loadingDropdownClienteProveedor = false;
      },
      error: (err) => {
        console.log(`Error en listado de proveedores, ${err}`)
        this.loadingDropdownClienteProveedor = false;
      }
    });
  }

  /**
   * Listado de bancos
   */
  getBancos(): void {
    this.loadingDropdownBancos = true;
    this.buscarClienteService.getBancos().subscribe({
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
      complete: () => {
        this.loadingDropdownBancos = false;
      },
      error: (err) => {
        this.loadingDropdownBancos = false;
        console.log(`Error en listado de bancos, ${err}`);
      }
    });
  }

  //Código de busqueda via API (clientes/proveedores)
  filterApi$() {
    this.filtro$
      .pipe(
        debounceTime(800),
        tap(searchTerm => {
          this.queryParams.searchTerm = searchTerm;

        }),
        switchMap(() => this.buscarClienteService.getClientesProveedores(this.queryParams, this.isCliente))
      )
      .subscribe({
        next: (response) => {
          this.dropdownClienteProveedor = response.data;
          this.loadingDropdownClienteProveedor = false;
        },
        error: (err) => {
          this.loadingDropdownClienteProveedor = false;
          console.error(`Error en la busqueda: ${err}`);
        }
      });
  }

  //Bloquear select bancos si es cuenta corriente
  eventIngresoCuentaCorriente(event: DropdownChangeEvent) {
    const valueEvent: DropdownChangeEvent = event.value;
    resetFieldsForm(this.formCliente, 'bancos');

    if (valueEvent.value === '1') {
      this.getBancos();
      toggleFields(this.formCliente, 'bancos', true);
    } else {
      toggleFields(this.formCliente, 'bancos', false);
    }

  }

  //Evento filter Dropdown (clientes/proveedor)
  filterApi(eventFilter: DropdownFilterEvent): void {
    this.loadingDropdownClienteProveedor = true;
    this.filtro$.next(eventFilter.filter);
  }

  //Enlazar busqueda por id con dropdown cliente/proveedor
  getClienteOrProveedorById(id: number) {
    this.loadingDropdownClienteProveedor = true;
    this.buscarClienteService.getClienteOrProveedorById(id, this.isCliente).subscribe({
      next: (response) => {
        const {
          payload: clienteOrProveedorById
        } = response;
        const controlDropdownClienteProveedor = this.formCliente.get('listProveedorCliente');

        if (!this.isCliente) {
          const proveedorFind = clienteOrProveedorById as PayloadProveedores;
          const existId = (this.dropdownClienteProveedor as Proveedores)?.payload.some(p => p.provId === proveedorFind.provId);
          if (!existId) (this.dropdownClienteProveedor as Proveedores)?.payload.push(proveedorFind);

        } else {
          const clientFind = clienteOrProveedorById as PayloadClientes;
          const existId = (this.dropdownClienteProveedor as Clientes)?.payload.some(p => p.idCliente === clientFind.idCliente);
          if (!existId) (this.dropdownClienteProveedor as Clientes)?.payload.push(clientFind);
        }


        controlDropdownClienteProveedor!.setValue(clienteOrProveedorById);
      },
      complete: () => {
        this.loadingDropdownClienteProveedor = false;
      },
      error: (err) => {
        this.loadingDropdownClienteProveedor = false;
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
 * @param field
 * @returns boolean
 */
  isValidField = (field: string): boolean => isInvalidField(this.formCliente, field)

  /**
* Mostrar errores de validación
* @param field
* @returns string
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

  //Buscar por id cliente/proveedor
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

  //Evento dropdownClienteProveedor
  onChangeDropdownClienteProveedor($event: DropdownChangeEvent) {
    const event: DropdownChangeEvent = $event.value;

    if (!event) return;

    toggleValidators(this.formCliente, 'idProveedorCliente', Validators.required);
  }


  /**
   * Disparar formulario valido
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

    // sessionStorage.setItem('objectPaso1', JSON.stringify(formControls));
    this.sessionService.set('objectPaso1', JSON.stringify(formControls));

    this.queryParmasIngresos.emit({
      ...this.ingresosParams,
      dateMin: formattedDateMin,
      dateMax: formattedDateMax,
    });
    this.isValidSearch.emit(true);

  }
}
