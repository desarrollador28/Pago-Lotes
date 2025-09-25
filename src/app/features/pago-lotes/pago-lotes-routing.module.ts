import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { AuthGuard } from '../../core/services/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StepperComponent,
    // canActivate: [AuthGuard]
    
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoLotesRoutingModule { }
