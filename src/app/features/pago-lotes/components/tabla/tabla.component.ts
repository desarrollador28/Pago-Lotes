import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Ingresos, Pagination, ParamsIngresos, PayloadIngresos } from '../../../../core/services/pago-lotes/interfaces/buscar-cliente';
import { BuscarClienteProveedorService } from '../../../../core/services/pago-lotes/buscar-cliente.service';
import { finalize } from 'rxjs';

interface Column {
  field: string;
  header: string;
  pipe?: 'currency' | 'date' | string;
}

@Component({
  selector: 'pago-lotes-tabla',
  standalone: false,
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnChanges {
  @Input() queryParamsIngresos: ParamsIngresos | undefined;

  public ingresosFilter!: Ingresos;
  public loading: boolean = false;
  public pagination: Pagination | undefined;
  public cols!: Column[];
  public total: number = 0;
  public ingresosSelected: PayloadIngresos | [] | undefined;
  constructor(private buscarClienteProveedorService: BuscarClienteProveedorService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['queryParamsIngresos']) {
      this.pagination = {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 0,
        currentPage: 1,
      };
      this.cols = [
        { field: 'idIngreso', header: 'Ingreso' },
        { field: 'importe', header: 'Importe', pipe: 'currency' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'referencia', header: 'Referencia' },
        { field: 'saldo', header: 'Saldo', pipe: 'currency' },
        { field: 'acciones', header: 'Acciones' },
      ];
      this.getAllIngresosFilter();
    }
  }

  /**
   * Obtener ingresos por query params (filtro)
   */
  getAllIngresosFilter(): void {
    this.loading = true;
    this.buscarClienteProveedorService.getAllIngresos(this.pagination!, this.queryParamsIngresos!)
      .pipe(finalize(() => this.loading = false)).
      subscribe({
        next: (response) => {
          const {
            data,
            pagination
          } = response;
          this.pagination = pagination;
          this.ingresosFilter = data;
          this.calculateSaldo();
        },
        error: (err) => {
          console.log('Error en obtener ingresos', err);
        }
      })
  }

  //Total suma de saldo
  calculateSaldo(): void {
    let total: number = 0;
    for (const ingresos of this.ingresosFilter!.payload) {
      total += ingresos.saldo;
    }

    this.total = total;
  }

  selectIngreso() {
    console.log(this.ingresosSelected)
  }
}
