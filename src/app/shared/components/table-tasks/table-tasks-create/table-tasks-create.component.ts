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
  selector: 'app-table-tasks-create',
  templateUrl: './table-tasks-create.component.html',
  styleUrls: ['./table-tasks-create.component.scss'],
})
export class TableTasksCreateComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({});
  toastMessage = '';
  showToast = false;
  toastType: ToastType = 'success';

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formCreate = this.fb.group({
      name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      isPayed: new FormControl(false),
    });
  }

  formatValue(event: any) {
    let typedValue = event.target.value;
    typedValue = typedValue.replace(/[^\d,]/g, '');
    const formatedValue = parseFloat(typedValue.replace(',', '.')).toFixed(2);

    if (isNaN(parseFloat(formatedValue))) {
      this.formCreate.controls['value'].setValue('R$ 0,00');
      return;
    }
    const parts = formatedValue.split('.');
    const realPartWithoutPoints = parts[0].replace(/\./g, '');
    const realPartWithPoints = realPartWithoutPoints.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    const decimal = parts[1] || '00';

    this.formCreate.controls['value'].setValue(
      `R$ ${realPartWithPoints},${decimal}`
    );
  }

  convertValueToFloat() {
    const value = this.formCreate.controls['value'].value;
    const valueWithoutMask = value.replace('R$ ', '').replace('.', '');
    const valueFloat = parseFloat(valueWithoutMask.replace(',', '.'));
    this.formCreate.controls['value'].setValue(valueFloat);
  }

  convertDateToISO() {
    const date = this.formCreate.controls['date'].value;
    const dateArray = date.split('/');
    const dateISO = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    this.formCreate.controls['date'].setValue(new Date(dateISO).toISOString());
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

  create() {
    this.convertValueToFloat();
    this.convertDateToISO();

    this.taskService.create(this.formCreate.value).subscribe({
      error: () => {
        this.handleToast('erro desconhecido ao criar pagamento', 'error');
      },
      complete: () => {
        this.bsModalRef.hide();
      },
    });
  }
}
