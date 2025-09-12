import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  private width$ = new BehaviorSubject<number>(window.innerWidth);


  //Escuchar los cambios de tamaño de la ventana
  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize').subscribe(() => {
        this.ngZone.run(() => {
          this.width$.next(window.innerWidth);
        });
      });
    });
  }

  //Suscribirse a los cambios de la pantalla
  get viewportWidth$() {
    return this.width$.asObservable();
  }

  //Obtener valor actual de la pantalla
  get currentWidth() {
    return this.width$.value;
  }
}