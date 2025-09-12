import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'pago-lotes';

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
      if (result !== null && result.account) {
        this.msalService.instance.setActiveAccount(result.account);
      }
    });
  }
}
