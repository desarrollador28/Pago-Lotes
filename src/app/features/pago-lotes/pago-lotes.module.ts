import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { PagoLotesRoutingModule } from './pago-lotes-routing.module';
import { StepperComponent } from './components/stepper/stepper.component';
import { PrimeNGModule } from '../../shared/primeNG/primeNG.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BuscarClienteProveedorPageComponent } from './stepper-one/buscar-cliente-proveedor/pages/buscar-cliente-proveedor-page.component';
import { DocumentosCobranzaPageComponent } from './stepper-two/documentos-cobranza/page/documentos-cobranza-page.component';
import { DialogComponent } from './stepper-two/components/dialog/dialog.component';
import { TablaIngresosBancariosComponent } from './stepper-one/components/tabla/tabla.component';
import { TablaFacturasComponent } from './stepper-two/components/tabla/tabla-facturas.component';
import { BatchStatusPageComponent } from './stepper-three/pages/batch-status/batch-status-page.component';


@NgModule({
  declarations: [
    BuscarClienteProveedorPageComponent,
    StepperComponent,
    DocumentosCobranzaPageComponent,
    DialogComponent,
    TablaIngresosBancariosComponent,
    TablaFacturasComponent,
    BatchStatusPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGModule,
    PagoLotesRoutingModule,
    SharedModule,
  ],
  exports: [
    StepperComponent
  ],
  providers: [CurrencyPipe]

})
export class PagoLotesModule { }
