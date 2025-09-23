import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // Diccionario dinámico de claves → BehaviorSubject
  private subjects: Map<string, BehaviorSubject<string | null>> = new Map();

  constructor() { }

  // Obtiene el observable para una clave
  watch(key: string): Observable<string | null> {
    if (!this.subjects.has(key)) {
      const storedValue = sessionStorage.getItem(key);
      this.subjects.set(key, new BehaviorSubject<string | null>(storedValue));
    }
    return this.subjects.get(key)!.asObservable();
  }

  // Obtener el valor actual de una clave
  get(key: string): string | null {
    if (!this.subjects.has(key)) {
      const storedValue = sessionStorage.getItem(key);
      this.subjects.set(key, new BehaviorSubject<string | null>(storedValue));
    }
    return this.subjects.get(key)!.value;
  }

  //Guardar valor y notificar a los componentes
  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<string | null>(value));
    }
    this.subjects.get(key)!.next(value);
  }
}