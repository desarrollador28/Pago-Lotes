import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { Clientes, CreatePaymentBatchRequest, CreatePaymentBatchResponse, Facturas, GetBatchStatus, Params } from './interfaces/pago-lotes.interface';
import { map, Observable, of } from 'rxjs';
import { PaginationResponse } from '../../../shared/helpers/paginator.helper';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private baseUrl: string = enviroment.baseUrl;

  constructor(private http: HttpClient) { }

  getFacturasFilter(queryParams: Params): Observable<{ data: Facturas, pagination: PaginationResponse }> {

    let params = new HttpParams()
      .set('searchTerm', queryParams.searchTerm)
      .set('PageSize', queryParams.paginationRequest.pageSize)
      .set('PageNumber', queryParams.paginationRequest.pageNumber);

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

  //Aplicar poagos
  createPaymentBatch(body: CreatePaymentBatchRequest): Observable<{ data: CreatePaymentBatchResponse, location: string | null;}> {
    return this.http.post<CreatePaymentBatchResponse>(`${this.baseUrl}/payment-batches`, body,{ observe: 'response' }).pipe(
      map(response => {
        const localtionHeader = response.headers.get('Location');
        let location = null;

        if (localtionHeader) {
          location = localtionHeader;
        }

        return {
          data: response.body as CreatePaymentBatchResponse,
          location
        };
      })
    );
  }

  isFactura(isFactura: boolean): Observable<boolean> {
    return of(isFactura)
  }

  //Obtener status de los pagos aplicados
  getBatchStatus(id: number): Observable<GetBatchStatus> {
    return this.http.get<GetBatchStatus>(`${this.baseUrl}/payment-batches/${id}`);
  }
}
