import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ITask } from '../../table-tasks/interfaces/task.interface';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() confirmButtonTxt: string = 'confirmar';
  @Input() cancelButtonTxt: string = 'cancelar';
  @Input() task: ITask = {} as ITask;

  @Output() confirm: EventEmitter<ITask> = new EventEmitter<ITask>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closeModal();
  }

  closeModal() {
    this.show = false;
    this.cancel.emit(true);
  }

  onBackgroundClick() {
    this.show = false;
    this.cancel.emit(true);
  }

  onConfirm() {
    this.confirm.emit(this.task);
  }

  onCancel() {
    this.cancel.emit(true);
  }
}
