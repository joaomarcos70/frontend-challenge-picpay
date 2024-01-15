import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITask } from '../interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-table-tasks-edit',
  templateUrl: './table-tasks-edit.component.html',
  styleUrls: ['./table-tasks-edit.component.scss'],
})
export class TableTasksEditComponent implements OnInit {
  data: any = {};
  editForm: FormGroup = new FormGroup({});

  formatedValue: string = '';

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
      name: new FormControl(this.data.name),
      title: new FormControl(this.data.title),
      date: new FormControl(this.data.formatedDate),
      value: new FormControl(this.data.formatedValue),
      isPayed: new FormControl(this.data.isPayed),
    });
  }

  formatarValor(event: any) {
    let valorDigitado = event.target.value;
    valorDigitado = valorDigitado.replace(/[^\d,]/g, '');
    const valorFormatado = parseFloat(valorDigitado.replace(',', '.')).toFixed(
      2
    );

    if (isNaN(parseFloat(valorFormatado))) {
      this.editForm.controls['value'].setValue('R$ 0,00');
      return;
    }
    const partes = valorFormatado.split('.');
    const parteInteiraSemPontos = partes[0].replace(/\./g, '');
    const parteInteiraComPontos = parteInteiraSemPontos.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    const parteDecimal = partes[1] || '00';

    this.editForm.controls['value'].setValue(
      `R$ ${parteInteiraComPontos},${parteDecimal}`
    );
  }

  convertValueToFloat() {
    const value = this.editForm.controls['value'].value;
    console.log(value);
    /*     const valueWithoutMask = value.replace('R$ ', '').replace('.', '');

 */
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

  saveTask() {
    this.convertValueToFloat();
    this.convertDateToISO();
    this.taskService.edit(this.editForm.value).subscribe({
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.bsModalRef.hide();
      },
    });
  }
}
