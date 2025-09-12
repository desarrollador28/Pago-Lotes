import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'pago-lotes-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private msalService: MsalService, private route: Router) { }

  login(): void {
    this.msalService.loginPopup()
      .subscribe({
        next: (response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
          this.route.navigate(['/pago-lotes']);
        },
        error: (err) => {
          console.error('❌ Login error:', err);
        }
      });
  }
}
