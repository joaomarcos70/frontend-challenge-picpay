import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask, ITaskSort } from '../interfaces/task.interface';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TableTasksEditComponent } from '../table-tasks-edit/table-tasks-edit.component';
import { TableTasksCreateComponent } from '../table-tasks-create/table-tasks-create.component';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.scss'],
})
export class TableTasksComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  tasks: ITask[] = [];
  searchSubject = new Subject<string>();
  bsModalRef?: BsModalRef;

  filterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    isPayed: new FormControl(null),
  });

  isLoading = true;
  page: number = 1;
  next: number = 0;
  prev: number = 0;
  total: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;

  sort: ITaskSort = {
    sortBy: '',
    orderByDecCre: false,
  };

  showConfirmModal: boolean = false;

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
      .getTasks(this.filterForm.value, this.sort, this.page, this.pageSize)
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
            this.sort,
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
    this.bsModalRef = this.modalService.show(
      TableTasksCreateComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  edit(task: ITask) {
    const initialState: ModalOptions = {
      initialState: {
        data: task,
      },
    };

    this.bsModalRef = this.modalService.show(
      TableTasksEditComponent,
      Object.assign({}, { class: 'modal-dialog-centered' }, initialState)
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  handleFilter(filter: string) {
    this.sort.sortBy = filter;
    this.sort.orderByDecCre = !this.sort.orderByDecCre;
    this.filter();
  }

  filterGroup() {
    this.filter();
  }

  openConfirmModal(task: ITask) {
    this.confirmModal.task = task;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  remove(task: ITask) {
    console.log(task);
    this.taskService.delete(task).subscribe({
      next: (task) => {
        console.log(task);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.showConfirmModal = false;
      },
    });
  }
}
