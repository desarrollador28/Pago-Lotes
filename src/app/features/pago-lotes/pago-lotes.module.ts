import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoLotesRoutingModule } from './pago-lotes-routing.module';
import { StepperComponent } from './components/stepper/stepper.component';
import { PrimeNGModule } from '../../shared/primeNG/primeNG.module';
import { BuscarClienteProveedorPageComponent } from './buscar-cliente-proveedor/pages/buscar-cliente-proveedor-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaComponent } from './components/tabla/tabla.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DocumentosCobranzaPageComponent } from './documentos-cobranza/page/documentos-cobranza-page.component';
import { SharedModule } from '../../shared/shared.module';
import { FacturasPageComponent } from './facturas/page/facturas-page.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BuscarClienteProveedorPageComponent,
    StepperComponent,
    TablaComponent, DialogComponent, DocumentosCobranzaPageComponent, FacturasPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule,
    PagoLotesRoutingModule,
    SharedModule
  ],
  exports: [
    StepperComponent
  ]

})
export class PagoLotesModule { }
