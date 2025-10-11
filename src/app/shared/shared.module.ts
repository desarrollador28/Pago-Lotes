import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PrimeNGModule } from './primeNG/primeNG.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [HeaderComponent, LoadingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule,
  ],
  exports: [HeaderComponent, LoadingComponent]
})
export class SharedModule { }
