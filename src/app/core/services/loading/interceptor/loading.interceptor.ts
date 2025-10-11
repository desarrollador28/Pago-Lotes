import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../loading.service';
import { contentUrl } from '../../../../shared/helpers/url.helpers';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private baseUrl: string = enviroment.baseUrl;
  private endpointsToWatch: string[] = [];

  constructor(private loadingService: LoadingService) {
    this.endpointsToWatch = [
      '/movimientos-cuenta-corriente',
      '/api/ingresos',
      '/api/clientes',
      'api/facturas',
      'api/payment-batches'
    ];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldShow = contentUrl(this.endpointsToWatch, req.url);
    let showLoading: string | null = '';

    if (req.headers.has('X-Spinner')) {
      showLoading = req.headers.get('X-Spinner');
      if (showLoading === '0') {
        return next.handle(req);
      }
    }

    if (shouldShow) {
      this.loadingService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (shouldShow) {
          this.loadingService.hide();
        }
      })
    );
  }
}
