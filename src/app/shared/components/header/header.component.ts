import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pago-lotes-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private render: Renderer2, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.deleteMarginBody();
  }

  get nameAcount(): string | null {
    return this.authService.getUserName();
  }


  deleteMarginBody(): void {
    const body = document.body;
    this.render.setStyle(body, 'margin', '0');
  }

  logout(): void {
    this.authService.logout();
  }


}
