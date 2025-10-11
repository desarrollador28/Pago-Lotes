import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  private activeRequests = 0;
  public readonly loading$ = this._loading.asObservable();

  show(): void {
    this.activeRequests++;
    this._loading.next(true);
  }

  hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this._loading.next(false);
    }
  }
}
