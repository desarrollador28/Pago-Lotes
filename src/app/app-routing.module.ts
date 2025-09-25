import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'pago-lotes',
    loadChildren: () => import('./features/pago-lotes/pago-lotes.module').then(m => m.PagoLotesModule),
    // canLoad: [AuthGuard]
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
