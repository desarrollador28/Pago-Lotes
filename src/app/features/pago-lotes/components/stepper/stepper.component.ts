import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ParamsIngresos } from '../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { SessionService } from '../../../../core/services/pago-lotes/session.service';

@Component({
  selector: 'pago-lotes-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements OnInit {
  public isValidFilterIngresos: boolean = false;
  public queryParamsIngresos: ParamsIngresos | undefined;
  public isValidSelectedIngreso: boolean = false;
  public activeIndex: number = 0;
  public batchId: number = 0;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getId();
  }


  onValidSearchIngresos(isValid: boolean): void {
    this.isValidFilterIngresos = isValid;
  }

  eventQueryParamsIngresos(queryParams: ParamsIngresos): void {
    this.queryParamsIngresos = queryParams;
  }

  eventIsValidSelectedIngreso(event: boolean): void {
    this.isValidSelectedIngreso = event;
    this.activeIndex = 1;
  }

  getId(): void {
    this.isValidSelectedIngreso = true;
    this.sessionService.watch('batchID').subscribe(id => {
      const sessionId = id;
      if (sessionId) {
        this.batchId = Number(sessionId);
        this.activeIndex = 2;
      }
    });
  }

}
