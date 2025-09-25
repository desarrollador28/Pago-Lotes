import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TableDialog } from '../../interfaces/dialog.interface';
import { catchError, debounceTime, finalize, of, Subject, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { SessionService } from '../../../../../core/services/pago-lotes/session.service';
import { BuscarClienteProveedorService } from '../../../../../core/services/pago-lotes/buscar-cliente.service';
import { Cliente, Clientes, Factura, Facturas, Params, PayloadClientes, PayloadFactura } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { FacturasService } from '../../../../../core/services/pago-lotes/facturas.service';
import { CustomColumn } from '../../../interfaces/table.interface';


@Component({
  selector: 'pago-lotes-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  @Output() eventCliente = new EventEmitter<PayloadClientes>;
  @Output() facturasEvent = new EventEmitter<PayloadFactura[]>
  @Input() idCliente: number = 0;
  @Input() isValidCliente: boolean = false;
  private filtro$ = new Subject<string>;
  public visible: boolean = false;
  public loadingTable: boolean = false;
  public total: number = 0;
  public isValidFacturas: boolean = true;
  public selectionModel: Factura | Cliente | undefined;
  public facturasSelected: PayloadFactura[] = [];
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
    pageSize: 10,
    pageNumber: 1,
    idCliente: 0,
  }

  constructor(
    private currencyPipe: CurrencyPipe,
    private clienteService: BuscarClienteProveedorService,
    private facturaService: FacturasService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.showColumns();
    this.filtroApi$();
    // this.selectionModel = this.clienteSelected ?? this.facturasSelected;

  }


  showDialog(): void {
    this.visible = true;
    // this.getClientes();
    this.dataDialog.isCliente ? this.getClientes() : this.getFacturas();
  }

  /**
   * Columnas de la tabla clientes o factura
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
   * Obtener clientes páginado
   */
  getClientes(): void {
    this.clienteService.getClientesProveedores(this.queryParams, this.dataDialog.isCliente)
      .pipe(
        tap(() => this.loadingTable = true),
        finalize(() => this.loadingTable = false)
      ).subscribe({
        next: ({ data, pagination }) => {
          this.dataTable = data as Clientes;
          // console.log(data)
          // console.log(pagination)
        },
        error: (err) => {
          console.log('Error en busqueda de cliente', err);
        }
      })
  }


  /**
   * Llamar api para busqueda por nombre
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
    ).subscribe(({ data, pagination }) => {
      this.dataTable = this.dataDialog.isCliente ? data as Clientes : data as Facturas;
    });
  }

  /**
   * Obtener facturas paginado
   */
  getFacturas(): void {
    this.queryParams.idCliente = this.idCliente;
    this.facturaService.getFacturasFilter(this.queryParams)
      .pipe(
        tap(() => {
          this.loadingTable = true;
        }),
        finalize(() => this.loadingTable = false),)
      .subscribe({
        next: ({ data, pagination }) => {
          this.dataTable = data as Facturas;
        },
        error: (err) => {
          console.log('Error en listado de facturas', err);
        }
      })
  }


  /**
   * Filtrado de clientes por nombre
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
  selectData(rowData: PayloadClientes | PayloadFactura): void {
    if (this.dataDialog.isCliente) {
      const cliente = rowData as PayloadClientes;
      this.eventCliente.emit(cliente);
      this.visible = false;
    } else {
      const factura = rowData as PayloadFactura;
      const exist = this.facturasSelected.some(f => f.idFactura === factura.idFactura);
      if (exist) {
        this.facturasSelected = this.facturasSelected.filter(f => f.idFactura !== factura.idFactura);
      } else {
        this.facturasSelected.push(factura);
      }

      this.calculateTotal();
    }
  }

  cancelar(): void {
    this.visible = false;
    this.facturasSelected = [];
    this.facturasEvent.emit(this.facturasSelected);
  }

  //Disparar evento para mostrar facturas
  facturasApply(): void {
    this.facturasEvent.emit([...this.facturasSelected]);
    this.visible = false;
  }

  calculateTotal(): void {
    if (this.facturasSelected.length === 0) {
      this.total = 0;
      return;
    }

    let total = 0;
    for (let factura of this.facturasSelected) {
      total += factura.saldo;
    }

    this.total = total;

    const ingresoSelect: string | null = this.sessionService.get('ingresoBancarioSelected');

    const ingresoBancario = JSON.parse(ingresoSelect!);

    const saldoFormat = this.currencyPipe.transform(ingresoBancario.saldo, 'USD', 'symbol', '1.2-2');
    if (this.total > ingresoBancario.saldo) {
      this.isValidFacturas = false;
      this.visible = false;
      Swal.fire({
        title: `Error selección de facturas`,
        icon: "error",
        text: `Las facturas seleccionadas superan el saldo: ${saldoFormat}`
      }).then(() => {
        this.visible = true;
      });
    } else {
      this.isValidFacturas = true;
    }

  }
}
