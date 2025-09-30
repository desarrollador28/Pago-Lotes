import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TableDialog } from '../../interfaces/dialog.interface';
import { catchError, debounceTime, finalize, of, Subject, switchMap, tap } from 'rxjs';
import { BuscarClienteProveedorService } from '../../../../../core/services/pago-lotes/buscar-cliente.service';
import { Cliente, Clientes, Factura, Facturas, Params } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { FacturasService } from '../../../../../core/services/pago-lotes/facturas.service';
import { CustomColumn } from '../../../interfaces/table.interface';
import { Paginator } from '../../../../../shared/helpers/paginator.helper';
import { TablePageEvent } from 'primeng/table';


@Component({
  selector: 'pago-lotes-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  @Output() eventCliente = new EventEmitter<Cliente['payload']>;
  @Output() facturasEvent = new EventEmitter<Facturas['payload']>
  @Input() idCliente: number = 0;
  @Input() isValidCliente: boolean = false;
  public paginator = new Paginator();
  private isCliente$: Subject<boolean> = new Subject<boolean>;
  private filtro$: Subject<string> = new Subject<string>;
  public visible: boolean = false;
  public loadingTable: boolean = false;
  public total: number = 0;
  public isValidFacturas: boolean = true;
  public selectionModel: Factura | Cliente | undefined;
  public facturasSelected: Facturas = {
    status: {
      isSuccess: false,
      statusCode: 0,
      message: ''
    },
    payload: []
  };
  public dataTable: Clientes | Facturas | undefined;
  public cols: CustomColumn[] = [];
  @Input() dataDialog: TableDialog = {
    label: '',
    roudend: false,
    isCliente: false,
    title: ''
  };
  public queryParams: Params = {
    searchTerm: '',
    idCliente: 0,
    paginationRequest: {
      pageNumber: 1,
      pageSize: 5
    }
  }

  constructor(
    private clienteService: BuscarClienteProveedorService,
    private facturaService: FacturasService,
  ) { }

  ngOnInit() {
    this.showColumns();
    this.filtroApi$();
    this.getClientesOrFacturas$();

  }


  /**
   * Mostrar dialog de clientes o facturas
   * Dispara metodo getClientesOrFacturas$()
   * @return void
   */
  showDialog(): void {
    this.visible = true;

    this.dataDialog.isCliente
      ? this.isCliente$.next(this.dataDialog.isCliente)
      : this.isCliente$.next(this.dataDialog.isCliente);
  }

  /**
   * Columnas de la tabla clientes o factura
   * @return void
   */
  showColumns(): void {
    if (this.dataDialog.isCliente) {
      this.cols = [
        { field: 'idCliente', header: 'Cod. Cliente' },
        { field: 'nombre', header: 'Nombre del Cliente' },
        { field: 'rfc', header: 'RFC Cliente' },
        { field: 'acciones', header: '' },
      ];
    } else {
      this.cols = [
        { field: 'acciones', header: '' },
        { field: 'idFactura', header: 'ID Factura' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'factura', header: 'Factura' },
        { field: 'contratoAnexo', header: 'Contrato-Anexo' },
        { field: 'concepto', header: 'Concepto' },
        { field: 'saldo', header: 'Saldo', pipe: 'currency' },
        { field: 'totalNeto', header: 'Total Neto', pipe: 'currency' },
      ];
    }
  }


  /**
   * Obtener clientes o facturas paginado
   * Nota: solo se manda a llamar una vez
   * @return void
   */
  getClientesOrFacturas$(): void {
    this.isCliente$.pipe(
      (tap(() => {
        this.loadingTable = true
        this.queryParams.paginationRequest = this.paginator.request;
      })),
      switchMap((flag) =>
        flag ? this.clienteService.getClientesProveedores(this.queryParams, this.dataDialog.isCliente).pipe(
          finalize(() => this.loadingTable = false),)
          : this.facturaService.getFacturasFilter(this.queryParams).pipe(
            finalize(() => this.loadingTable = false),
          )
      ),
    ).subscribe({
      next: ({ data, pagination }) => {
        this.dataTable = this.dataDialog.isCliente ? data as Clientes : data as Facturas;
        this.paginator.setResponse(pagination.TotalCount);

      },
      error: (err) => {
        console.error('Error en la busqueda de datos', err)
      }
    })
  }


  /**
   * Llamar api para busqueda por nombre
   * Nota: solo se manda a llamar una vez
   * @return voud
   */
  filtroApi$(): void {
    const searchFactura: boolean = this.dataDialog.isCliente ? false : true;
    this.filtro$.pipe(
      debounceTime(600),
      tap((value) => {
        this.loadingTable = true;
        this.queryParams.searchTerm = value;
      }),
      switchMap(() =>
        this.facturaService.isFactura(searchFactura).pipe(
          switchMap(flag =>
            flag
              ? this.facturaService.getFacturasFilter(this.queryParams)
              : this.clienteService.getClientesProveedores(this.queryParams, this.dataDialog.isCliente)
          ),
          catchError(err => {
            console.log('Error en búsqueda', err);
            return of({ data: [], pagination: null });
          }),
          finalize(() => this.loadingTable = false)
        )
      )
    ).subscribe(({ data }) => {
      this.dataTable = this.dataDialog.isCliente ? data as Clientes : data as Facturas;
    });
  }

  /**
   * Evento Filtrado de clientes por nombre
   * @param event
   * @return void
   */
  searchCliente(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filtro$.next(value);
  }

  /**
   * Evento de seleccion de cliente y factura
   * Se pueden seleccionar multiples facturas de un cliente
   * @param rowData
   */
  selectData(rowData: Cliente['payload'] | Factura['payload']): void {
    if (this.dataDialog.isCliente) {
      const cliente = rowData as Cliente['payload'];
      this.eventCliente.emit(cliente);
      this.visible = false;
    } else {
      const factura = rowData as Factura['payload'];
      const exist = this.facturasSelected.payload.some(f => f.idFactura === factura.idFactura);
      if (exist) {
        this.facturasSelected!.payload = this.facturasSelected.payload.filter(f => f.idFactura !== factura.idFactura);
      } else {
        this.facturasSelected!.payload.push(factura);
      }

      this.calculateTotal();
    }
  }

  cancelar(): void {
    this.visible = false;
    this.facturasSelected.payload = [];
    this.total = 0;
    this.facturasEvent.emit(this.facturasSelected.payload);
  }

  //Disparar evento para mostrar facturas
  facturasApply(): void {
    this.facturasEvent.emit(this.facturasSelected.payload);
    this.visible = false;
  }

  calculateTotal(): void {
    if (this.facturasSelected.payload.length === 0) {
      this.total = 0;
      return;
    }

    let total = 0;
    for (let factura of this.facturasSelected.payload) {
      total += factura.saldo;
    }

    this.total = total;
  }

  pageChange(event: TablePageEvent): void {
    this.paginator.update(event);

    this.dataDialog.isCliente
      ? this.isCliente$.next(this.dataDialog.isCliente)
      : this.isCliente$.next(this.dataDialog.isCliente);
  }

}
