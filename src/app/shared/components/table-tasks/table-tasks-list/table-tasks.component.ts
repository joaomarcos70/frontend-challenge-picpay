import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../interfaces/task.interface';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TableTasksEditComponent } from '../table-tasks-edit/table-tasks-edit.component';

@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.scss'],
})
export class TableTasksComponent implements OnInit {
  tasks: ITask[] = [];
  searchSubject = new Subject<string>();
  bsModalRef?: BsModalRef;
  filterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  isLoading = true;
  page: number = 1;
  next: number = 0;
  prev: number = 0;
  total: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;

  totalPagesArray: number[] = [];

  constructor(
    private taskService: TaskService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.filter();
    this.setupSearch();
  }

  filter() {
    this.taskService
      .getTasks(this.filterForm.value, this.page, this.pageSize)
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks.data;
          this.total = tasks.items;
          this.totalPages = tasks.pages;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  setupSearch() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() =>
          this.taskService.getTasks(
            this.filterForm.value,
            this.page,
            this.pageSize
          )
        )
      )
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks.data;
          this.total = tasks.items;
          this.totalPages = tasks.pages;
        },
        error: (error) => console.log(error),
        complete: () => (this.isLoading = false),
      });
  }

  search(event: any) {
    this.filterForm.controls['name'].setValue(event.target.value);
    this.searchSubject.next(this.filterForm.controls['name'].value);
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    if (this.filterForm.controls['name'].value) {
      this.searchSubject.next(this.filterForm.controls['name'].value);
      return;
    }
    this.filter();
  }

  onNext() {
    this.page = this.next;
    this.filter();
  }

  add() {
    console.log('add');
  }

  edit(task: ITask) {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...',
        ],
        title: 'Modal with component',
      },
    };

    this.bsModalRef = this.modalService.show(
      TableTasksEditComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  remove(task: ITask) {
    console.log('delete');
  }
}
