import { Component, Input } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITask } from '../interfaces/task.interface';

@Component({
  selector: 'app-table-tasks-edit',
  templateUrl: './table-tasks-edit.component.html',
  styleUrls: ['./table-tasks-edit.component.scss'],
})
export class TableTasksEditComponent {
  constructor(private fb: FormBuilder) {}

  @Input() data: ITask = {} as ITask;

  editForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.name),
    title: new FormControl(this.data.title),
    date: new FormControl(this.data.date),
    value: new FormControl(this.data.value),
    isPayed: new FormControl(this.data.isPayed),
  });

  ngOnChanges() {
    if (this.data) {
      this.editForm.patchValue(this.data);
    }
  }

  save() {
    console.log(this.editForm.value);
  }
}
