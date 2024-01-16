import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() hide: boolean = false;
  /*   @Input() success: boolean = true;
  @Input() warning: boolean = false;
  @Input() danger: boolean = false;
  @Input() info: boolean = false; */
  @Input() type: ToastType = 'success';
  @Input() message: string = '';

  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.onShowToast();
  }

  onShowToast() {
    this.onShow.emit(true);

    setTimeout(() => {
      this.show = false;
      this.hide = true;
      this.onHide.emit(true);
    }, 3000);
  }

  close() {
    this.show = false;
    this.hide = true;
    this.onHide.emit(true);
  }
}
