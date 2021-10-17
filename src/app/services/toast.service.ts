import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast$ = new BehaviorSubject<Toast | null>(null);
  constructor() { }

  addToast(toast: Toast) {
    this.toast$.next(toast);
    setTimeout(() => {
      if (this.toast$.value === toast) {
        this.toast$.next(null);
      }
    }, toast.duration);
  }

  clearToast() {
    this.toast$.next(null);
  }
}
