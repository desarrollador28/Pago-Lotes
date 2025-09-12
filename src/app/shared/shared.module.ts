import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PrimeNGModule } from './primeNG/primeNG.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule,
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
