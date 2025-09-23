import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { Clientes, Facturas, Pagination, Params, Proveedores } from './interfaces/pago-lotes.interface';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private baseUrl: string = enviroment.baseUrl;

  constructor(private http: HttpClient) { }

  getFacturasFilter(queryParams: Params): Observable<{ data: Facturas, pagination: Pagination }> {

    let params = new HttpParams()
      .set('searchTerm', queryParams.searchTerm)
      .set('PageSize', queryParams.pageSize)
      .set('PageNumber', queryParams.pageNumber);

    if (queryParams.idCliente) {
      params = params.set('idCliente', queryParams.idCliente);
    }

    return this.http.get<Facturas>(`${this.baseUrl}/facturas`, { observe: 'response', params }).pipe(
      map(response => {
        const paginationHeader = response.headers.get('X-Pagination');
        let pagination = null;

        if (paginationHeader) {
          pagination = JSON.parse(paginationHeader);
        }

        return {
          data: response.body as Facturas,
          pagination
        };
      })
    );
  }

  isFactura(isFactura: boolean): Observable<boolean> {
    return of(isFactura)
  }
}
