import { Component} from '@angular/core';
import { ParamsIngresos } from '../../../../core/services/pago-lotes/interfaces/buscar-cliente';

@Component({
  selector: 'pago-lotes-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent{
  public isValidFilterIngresos: boolean = false;
  public queryParamsIngresos: ParamsIngresos | undefined;

  onValidSearchIngresos(isValid: boolean): void {
    this.isValidFilterIngresos = isValid;
  }

  eventQueryParamsIngresos(queryParams: ParamsIngresos): void {
    this.queryParamsIngresos = queryParams;
  }

}
