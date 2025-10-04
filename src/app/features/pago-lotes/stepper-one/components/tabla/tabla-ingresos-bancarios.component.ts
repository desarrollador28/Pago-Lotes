import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { finalize, Subject, switchMap, tap } from 'rxjs';
import { CustomColumn } from '../../../interfaces/table.interface';
import { Ingresos, ParamsIngresos, Ingreso } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { BuscarClienteProveedorService } from '../../../../../core/services/pago-lotes/buscar-cliente.service';
import { SessionService } from '../../../../../core/services/pago-lotes/session.service';
import { TablePageEvent } from 'primeng/table';
import { Paginator } from '../../../../../shared/helpers/paginator.helper';


@Component({
  selector: 'pago-lotes-tabla-ingresos-bancarios',
  standalone: false,
  templateUrl: './tabla-ingresos-bancarios.component.html',
  styleUrls: ['./tabla-ingresos-bancarios.component.css']
})
export class TablaIngresosBancariosComponent implements OnChanges, OnInit {
  @Input() queryParamsIngresos: ParamsIngresos | undefined;
  @Output() eventSelectIngreso: EventEmitter<boolean> = new EventEmitter<boolean>;
  public paginator = new Paginator();
  private isCuentaCorriente$ = new Subject<boolean>();
  public ingresosFilter!: Ingresos;
  public loading: boolean = false;
  public cols!: CustomColumn[];
  public total: number = 0;
  public ingresoSelectedRadio!: Ingreso['payload'] | null;
  constructor(
    private buscarClienteProveedorService: BuscarClienteProveedorService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.initGetDataTable$();

    this.queryParamsIngresos?.idCuentaBancaria
      ? this.isCuentaCorriente$.next(false)
      : this.isCuentaCorriente$.next(true);

    this.cols = [
      { field: 'idIngreso', header: 'ID Ingreso' },
      { field: 'importe', header: 'Importe', pipe: 'currency' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'referencia', header: 'Referencia' },
      { field: 'saldo', header: 'Saldo', pipe: 'currency' },
      { field: 'acciones', header: 'Acciones' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['queryParamsIngresos']) return
    this.ingresoSelectedRadio = null;

    this.queryParamsIngresos?.idCuentaBancaria
      ? this.isCuentaCorriente$.next(false)
      : this.isCuentaCorriente$.next(true);
  }

  /**
   *
   * Obtener ingresos bancarios de clientes o proveedores
   * Nota: solo se manda a ejecutar una vez para evitar fujas de memoria
   * @param isCuentaCorriente Boolean
   * @return void
   */
  private initGetDataTable$(): void {
    this.isCuentaCorriente$.pipe(
      tap(() => this.loading = true),
      switchMap(flag => flag
        ? this.buscarClienteProveedorService.GetMovimientoCuentaCorrienteById(this.paginator.request, this.queryParamsIngresos!).pipe(
          finalize(() => this.loading = false)
        )
        : this.buscarClienteProveedorService.getAllIngresos(this.paginator.request, this.queryParamsIngresos!).pipe(
          finalize(() => this.loading = false)
        )
      ),
    ).subscribe({
      next: ({ data, pagination }) => {
        this.ingresosFilter = data;
        this.paginator.setResponse(pagination.TotalCount);
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
    this.sessionService.set('ingresoBancarioSelected', JSON.stringify(this.ingresoSelectedRadio))
    this.total = this.ingresoSelectedRadio
      ? (this.eventSelectIngreso.emit(true), this.ingresoSelectedRadio.saldo)
      : (this.eventSelectIngreso.emit(false), 0);
  }

  pageChange(event: TablePageEvent): void {
    this.paginator.update(event);
    this.queryParamsIngresos?.idCuentaBancaria
      ? this.isCuentaCorriente$.next(false)
      : this.isCuentaCorriente$.next(true);
  }


}
