import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITask } from '../interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-table-tasks-edit',
  templateUrl: './table-tasks-edit.component.html',
  styleUrls: ['./table-tasks-edit.component.scss'],
})
export class TableTasksEditComponent implements OnInit {
  data: ITask = {} as ITask;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.createForm();
    console.log(typeof this.data.value);
  }

  createForm() {
    this.editForm = this.fb.group({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name),
      title: new FormControl(this.data.title),
      date: new FormControl(this.data.date),
      value: new FormControl(this.data.value),
      isPayed: new FormControl(this.data.isPayed),
    });
  }

  saveTask() {
    this.taskService.edit(this.editForm.value).subscribe({
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.bsModalRef.hide();
        console.log('complete');
      },
    });
  }
}
