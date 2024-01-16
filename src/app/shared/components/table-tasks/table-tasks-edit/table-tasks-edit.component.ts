import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from 'src/app/services/task.service';
import { ToastType } from '../../toast/toast.component';

@Component({
  selector: 'app-table-tasks-edit',
  templateUrl: './table-tasks-edit.component.html',
  styleUrls: ['./table-tasks-edit.component.scss'],
})
export class TableTasksEditComponent implements OnInit {
  data: any = {};
  editForm: FormGroup = new FormGroup({});
  toastMessage = '';
  showToast = false;
  formatedValue: string = '';
  toastType: ToastType = 'success';
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, Validators.required),
      title: new FormControl(this.data.title, Validators.required),
      date: new FormControl(this.data.formatedDate, Validators.required),
      value: new FormControl(this.data.formatedValue, Validators.required),
      isPayed: new FormControl(this.data.isPayed, Validators.required),
    });
  }

  formatValue(event: any) {
    let typedValue = event.target.value;
    typedValue = typedValue.replace(/[^\d,]/g, '');
    const formatedValue = parseFloat(typedValue.replace(',', '.')).toFixed(2);

    if (isNaN(parseFloat(formatedValue))) {
      this.editForm.controls['value'].setValue('R$ 0,00');
      return;
    }
    const parts = formatedValue.split('.');
    const realPartWithoutPoints = parts[0].replace(/\./g, '');
    const realPartWithPoints = realPartWithoutPoints.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    const decimal = parts[1] || '00';

    this.editForm.controls['value'].setValue(
      `R$ ${realPartWithPoints},${decimal}`
    );
  }

  convertValueToFloat() {
    const value = this.editForm.controls['value'].value;

    const valueWithoutMask = value
      .replace(/R\$\s?/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    const valueFloat = parseFloat(valueWithoutMask.replace(',', '.'));
    this.editForm.controls['value'].setValue(valueFloat);
  }

  convertDateToISO() {
    const date = this.editForm.controls['date'].value;
    const dateArray = date.split('/');
    const dateISO = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    this.editForm.controls['date'].setValue(new Date(dateISO).toISOString());
  }

  handleToast(message: string, type: ToastType) {
    this.showToast = true;
    this.toastMessage = message;
    this.toastType = type;
  }

  hideToast() {
    this.showToast = false;
    this.toastMessage = '';
    this.toastType = 'success';
  }

  saveTask() {
    if (this.editForm.controls['id'].value !== typeof String) {
      this.handleToast('pagamento com tipo [id] diferente de string', 'error');
      return;
    }

    this.convertValueToFloat();
    this.convertDateToISO();
    this.taskService.edit(this.editForm.value).subscribe({
      error: () => {
        this.handleToast('Erro ao editar tarefa', 'error');
      },
      complete: () => {
        this.bsModalRef.hide();
      },
    });
  }
}
