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

  create() {
    this.taskService.create(this.formCreate.value).subscribe({
      next: (task) => {
        console.log(task);
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
