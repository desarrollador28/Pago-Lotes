// paginator.model.ts
import { TablePageEvent } from 'primeng/table';

export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
}

export interface PaginationResponse {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
  HasPrevious: boolean;
  HasNext: boolean;
}

export class Paginator {
  request: PaginationRequest = { pageNumber: 1, pageSize: 5 };
  response: PaginationResponse = {
    CurrentPage: 0,
    TotalPages: 0,
    PageSize: 5,
    TotalCount: 0,
    HasPrevious: false,
    HasNext: false
  };

  /**
   * Actualiza la paginación según el evento de PrimeNG.
   * Maneja cambio de tamaño de página y paginación normal.
   */
  update(event: TablePageEvent): void {
    const oldPageSize = this.request.pageSize;

    if (event.rows !== oldPageSize) {
      this.request.pageNumber = Math.floor(event.first / event.rows) + 1;
    } else {
      // Paginación normal
      this.request.pageNumber = Math.floor(event.first / event.rows) + 1;
    }

    this.request.pageSize = event.rows;
  }

  setResponse(totalCount: number): void {
    this.response.TotalCount = totalCount;
    this.response.TotalPages = Math.ceil(totalCount / this.request.pageSize);
    this.response.PageSize = this.request.pageSize;
    this.response.CurrentPage = this.request.pageNumber;
    this.response.HasPrevious = this.request.pageNumber > 1;
    this.response.HasNext = this.request.pageNumber < this.response.TotalPages;
  }
}
