import { Component} from '@angular/core';
import { ParamsIngresos } from '../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';

@Component({
  selector: 'pago-lotes-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent{
  public isValidFilterIngresos: boolean = false;
  public queryParamsIngresos: ParamsIngresos | undefined;
  public isValidSelectedIngreso: boolean = true;
  public activeIndex: number = 0;

  onValidSearchIngresos(isValid: boolean): void {
    this.isValidFilterIngresos = isValid;
  }

  eventQueryParamsIngresos(queryParams: ParamsIngresos): void {
    this.queryParamsIngresos = queryParams;
  }

  eventIsValidSelectedIngreso(event: boolean): void {
    this.isValidSelectedIngreso = !event;
    this.activeIndex = 1;
  }

}
