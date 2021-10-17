import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toast: Toast | null = null;
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast: Toast | null) => {
      this.toast = toast;
    });
  }

  closeToast() {
    this.toast = null;
  }

}
