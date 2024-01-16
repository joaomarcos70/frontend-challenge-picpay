import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask, ITaskSort } from '../interfaces/task.interface';

import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { TableTasksCreateComponent } from '../table-tasks-create/table-tasks-create.component';
import { TableTasksEditComponent } from '../table-tasks-edit/table-tasks-edit.component';

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

  toastMessage: string = '';
  toastShow: boolean = false;

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
    private modalService: BsModalService,
    private datePipe: DatePipe
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

    (this.bsModalRef.onHidden as Observable<any>).subscribe((res) => {
      res.id ? this.showToast('Pagamento criado com sucesso!') : null;
      this.filter();
    });
  }

  edit(task: any) {
    const formatedDate = this.datePipe.transform(
      task.date,
      'dd/MM/yyyy'
    ) as string;

    const formatedValue = task.value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    task = {
      ...task,
      formatedDate: formatedDate,
      formatedValue: formatedValue,
    };

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

    (this.bsModalRef.onHidden as Observable<any>).subscribe((res) => {
      res.id ? this.showToast('Pagamento editado com sucesso!') : null;
      this.filter();
    });
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

  hideToast() {
    this.toastShow = false;
    this.toastMessage = '';
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.toastShow = true;
  }

  remove(task: ITask) {
    this.taskService.delete(task).subscribe({
      next: (task) => {
        console.log(task);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.showToast('Pagamento removido com sucesso!');
        this.filter();
      },
    });
  }
}
