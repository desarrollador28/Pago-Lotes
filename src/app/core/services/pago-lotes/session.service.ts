import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // Diccionario dinámico de claves → BehaviorSubject
  private subjects: Map<string, BehaviorSubject<string | null>> = new Map();

  constructor() { }

  /**
   * Obtiene el observable para una clave
   * @param key
   * @return string | null
   */
  watch(key: string): Observable<string | null> {
    if (!this.subjects.has(key)) {
      const storedValue = sessionStorage.getItem(key);
      this.subjects.set(key, new BehaviorSubject<string | null>(storedValue));
    }
    return this.subjects.get(key)!.asObservable();
  }

  /**
   * Obtener el valor actual de una clave
   * @param key
   * @return string | null
   */
  get(key: string): string | null {
    if (!this.subjects.has(key)) {
      const storedValue = sessionStorage.getItem(key);
      this.subjects.set(key, new BehaviorSubject<string | null>(storedValue));
    }
    return this.subjects.get(key)!.value;
  }

  /**
   * Guardar valor y notificar a los componentes
   * @param key
   * @param value
   * @return void
   */
  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<string | null>(value));
    }
    this.subjects.get(key)!.next(value);
  }

  /**
   * Eliminar variable de sesion y notificar a los componentes que lo usan
   * @param key
   * @return void
   */
  remove(keys: string | string[]): void {
    const keysArray = Array.isArray(keys) ? keys : [keys];

    for (const key of keysArray) {
      sessionStorage.removeItem(key);
      if (this.subjects.has(key)) {
        this.subjects.get(key)!.next(null); // Notifica a los suscriptores que se eliminó
      }
    }
  }
}
