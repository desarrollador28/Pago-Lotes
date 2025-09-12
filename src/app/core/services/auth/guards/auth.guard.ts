import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Usuario logueado, permite acceso
      return true;
    } else {
      // No hay sesión, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(route: Route): boolean {
    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
