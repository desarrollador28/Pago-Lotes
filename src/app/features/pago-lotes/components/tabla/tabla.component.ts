import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Ingresos, Pagination, ParamsIngresos, PayloadFactura, PayloadIngresos } from '../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { BuscarClienteProveedorService } from '../../../../core/services/pago-lotes/buscar-cliente.service';
import { finalize, switchMap, tap } from 'rxjs';
import { CustomColumn } from './interfaces/table.interface';
import { SessionService } from '../../../../core/services/pago-lotes/session.service';


@Component({
  selector: 'pago-lotes-tabla',
  standalone: false,
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnChanges {
  @Input() queryParamsIngresos: ParamsIngresos | undefined;
  @Output() eventSelectIngreso: EventEmitter<boolean> = new EventEmitter<boolean>;
  public ingresosFilter!: Ingresos;
  public loading: boolean = false;
  public pagination: Pagination | undefined;
  public cols!: CustomColumn[];
  public total: number = 0;
  // public ingresosSelected: PayloadIngresos | undefined;
  // Para radio button (selección única)
  public ingresoSelectedRadio: PayloadIngresos | null = {
    idIngreso: 0,
    importe: 0,
    fecha: new Date(),
    referencia: '',
    saldo: 0
  };
  // Para checkbox (selección múltiple)
  // public ingresosSelectedCheckbox: PayloadIngresos[] = [];
  constructor(
    private buscarClienteProveedorService: BuscarClienteProveedorService,
    private sessionService: SessionService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagination = {
      pageSize: 10,
      pageNumber: 1,
      totalCount: 0,
      currentPage: 1,
    };

    this.cols = [
      { field: 'idIngreso', header: 'ID Ingreso' },
      { field: 'importe', header: 'Importe', pipe: 'currency' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'referencia', header: 'Referencia' },
      { field: 'saldo', header: 'Saldo', pipe: 'currency' },
      { field: 'acciones', header: 'Acciones' },
    ];

    if (!changes['queryParamsIngresos']) return;
    this.ingresoSelectedRadio = null;
    // this.ingresosSelectedCheckbox = [];

    this.queryParamsIngresos?.idCuentaBancaria
      ? this.getDataTable(false)
      : this.getDataTable(true);
  }

  /**
   *
   * @param isCuentaCorriente Boolean
   * @Obtener ingresos bancarios de clientes o proveedores
   * @return void
   */
  getDataTable(isCuentaCorriente: boolean): void {
    this.buscarClienteProveedorService.isCuentaCorriente(isCuentaCorriente).pipe(
      tap(() => this.loading = true),
      switchMap(flag => flag
        ? this.buscarClienteProveedorService.GetMovimientoCuentaCorrienteById(this.pagination!, this.queryParamsIngresos!)
        : this.buscarClienteProveedorService.getAllIngresos(this.pagination!, this.queryParamsIngresos!)
      ),
      finalize(() => this.loading = false)
    ).subscribe({
      next: ({ data, pagination }) => {
        this.pagination = pagination;
        this.ingresosFilter = data;
      },
      error: (err) => {
        console.log('Error en el listado de la tabla', err)
      }
    })
  }

  /**
   * Seleccionar registro de la tabla ingresos bancarios
   * @param rowData PayloadIngresos
   */
  selectIngreso(): void {
    // sessionStorage.setItem('ingresoBancarioSelected', JSON.stringify(this.ingresoSelectedRadio));
    this.sessionService.set('ingresoBancarioSelected', JSON.stringify(this.ingresoSelectedRadio))
    this.total = this.ingresoSelectedRadio
      ? (this.eventSelectIngreso.emit(true), this.ingresoSelectedRadio.saldo)
      : (this.eventSelectIngreso.emit(false), 0);
  }
}
