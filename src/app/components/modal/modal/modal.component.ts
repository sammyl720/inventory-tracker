import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() onDismiss = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  dismiss() {
    this.onDismiss.emit();
  }
}
