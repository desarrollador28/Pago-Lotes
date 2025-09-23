import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { enviroment } from '../enviroments/enviroment';
import { ViewportService } from './services/viewport.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BuscarClienteHeaderInterceptor } from './services/pago-lotes/interceptors/buscar-cliente.interceptor';
import { BuscarClienteProveedorService } from './services/pago-lotes/buscar-cliente.service';
import { FacturasService } from './services/pago-lotes/facturas.service';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: enviroment.clienteId,
      authority: `https://login.microsoftonline.com/${enviroment.inquilino}`,
      redirectUri: 'http://localhost:4200'
    }
  });
}

export function initializeMsal(msalService: MsalService) {
  return () => msalService.instance.initialize();
}

@NgModule({
  imports: [MsalModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      deps: [MsalService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BuscarClienteHeaderInterceptor,
      multi: true
    },
    ViewportService,
    BuscarClienteProveedorService,
    FacturasService
  ]
})
export class CoreModule {
}
