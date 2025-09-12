import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable()
export class BuscarClienteHeaderInterceptor implements HttpInterceptor {

  private subscriptionKey: string = enviroment.subscriptionKey;
  private baseUrl: string = enviroment.baseUrl;
  private allowedUrls: string[] = [
    this.baseUrl,
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifica si la URL coincide con alguna permitida
    const shouldAddHeader = this.allowedUrls.some(url => req.url.startsWith(url));

    if (shouldAddHeader) {
      const modifiedReq = req.clone({
        setHeaders: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey
        }
      });
      return next.handle(modifiedReq);
    }

    // Si no coincide, no modifica la petición
    return next.handle(req);
  }
}
