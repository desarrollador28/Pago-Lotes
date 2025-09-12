import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private msalService: MsalService) { }

  /**
   * Devuelve la cuenta activa (si existe)
   */
  private get activeAccount(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }

  /**
   * Obtiene el nombre del usuario logueado
   */
  getUserName(): string | null {
    return this.activeAccount?.name ?? null;
  }

  /**
   * Obtiene el email o username del usuario logueado
   */
  getUserEmail(): string | null {
    return this.activeAccount?.username ?? null;
  }

  /**
   * Verifica si hay sesión activa
   */
  isLoggedIn(): boolean {
    return this.activeAccount != null;
  }

  //Cerrar sesión
  logout(): void {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: '/login'
    });
  }
}
