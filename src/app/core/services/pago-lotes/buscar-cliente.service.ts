import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { map, Observable } from 'rxjs';
import { Bancos, Cliente, Clientes, Ingresos, Pagination, Params, ParamsIngresos, Proveedor, Proveedores } from './interfaces/buscar-cliente';

@Injectable({
  providedIn: 'root'
})
export class BuscarClienteProveedorService {

  private baseUrl: string = enviroment.baseUrl;
  constructor(private http: HttpClient) { }

  getBancos(): Observable<Bancos> {
    return this.http.get<Bancos>(`${this.baseUrl}/bancos`);
  }

  getClientesProveedores(params: Params, isCliente: boolean): Observable<{ data: Clientes | Proveedores; pagination: Pagination }> {
    const fullUrl = isCliente ? `${this.baseUrl}/clientes` : `${this.baseUrl}/proveedores`;
    const queryParams = new HttpParams()
      .set('searchTerm', params.searchTerm)
      .set('PageSize', params.pageSize)
      .set('PageNumber', params.pageNumber);

    return this.http.get<Clientes | Proveedores>(fullUrl, { observe: 'response', params: queryParams }).pipe(
      map(response => {
        const paginationHeader = response.headers.get('X-Pagination');
        let pagination = null;

        if (paginationHeader) {
          pagination = JSON.parse(paginationHeader);
        }

        return {
          data: response.body as Clientes | Proveedores,
          pagination
        };
      })
    );
  }

  getClienteOrProveedorById(id: number, isCliente: boolean): Observable<Cliente | Proveedor> {
    const url = isCliente ? `${this.baseUrl}/clientes/${id}` : `${this.baseUrl}/proveedores/${id}`;

    return this.http.get<Cliente | Proveedor>(url);
  }

  getAllIngresos(pagination: Pagination, queryParams: ParamsIngresos): Observable<{ data: Ingresos; pagination: Pagination }> {

    let queryParamsFilter = new HttpParams()
      .set('idCuentaBancaria', queryParams.idCuentaBancaria)
      .set('PageNumber', pagination.pageNumber)
      .set('PageSize', pagination.pageSize)


    if (queryParams.idCliente) {
      queryParamsFilter = queryParamsFilter.set('idCliente', queryParams.idCliente!);
    }

    if (queryParams.dateMax) {
      queryParamsFilter = queryParamsFilter.set('dateMax', queryParams.dateMax);
    }

    if (queryParams.dateMin) {
      queryParamsFilter = queryParamsFilter.set('dateMin', queryParams.dateMin);
    }


    return this.http.get<Ingresos>(`${this.baseUrl}/ingresos`, { observe: 'response', params: queryParamsFilter }).pipe(
      map(response => {
        const paginationHeader = response.headers.get('X-Pagination');
        let pagination = null;

        if (paginationHeader) {
          pagination = JSON.parse(paginationHeader);
        }

        return {
          data: response.body as Ingresos,
          pagination
        };
      })
    );
  }

}
