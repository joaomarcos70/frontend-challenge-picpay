import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-table-tasks-create',
  templateUrl: './table-tasks-create.component.html',
  styleUrls: ['./table-tasks-create.component.scss'],
})
export class TableTasksCreateComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({});

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

  handlePayment(event: any) {
    this.formCreate.controls['isPayed'].setValue(event.target.value);
  }

  formatarValor(event: any) {
    let valorDigitado = event.target.value;
    valorDigitado = valorDigitado.replace(/[^\d,]/g, '');
    const valorFormatado = parseFloat(valorDigitado.replace(',', '.')).toFixed(
      2
    );

    if (isNaN(parseFloat(valorFormatado))) {
      this.formCreate.controls['value'].setValue('R$ 0,00');
      return;
    }
    const partes = valorFormatado.split('.');
    const parteInteiraSemPontos = partes[0].replace(/\./g, '');
    const parteInteiraComPontos = parteInteiraSemPontos.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    const parteDecimal = partes[1] || '00';

    this.formCreate.controls['value'].setValue(
      `R$ ${parteInteiraComPontos},${parteDecimal}`
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

  create() {
    this.convertValueToFloat();
    this.convertDateToISO();

    this.taskService.create(this.formCreate.value).subscribe({
      next: (task) => {
        //console.log(task);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.bsModalRef.hide();
      },
    });
  }
}
