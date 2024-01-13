import { Component, Input, OnInit } from '@angular/core';
import { ITask } from './interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.scss'],
})
export class TableTasksComponent implements OnInit {
  tasks: ITask[] = [];
  searchSubject = new Subject<string>();

  isLoading = true;
  page: number = 1;
  next: number = 0;
  prev: number = 0;
  total: number = 0;
  pageSize: number = 10;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.filter();
    this.setupSearch();
  }

  filter() {
    this.taskService.getTasks(this.pageSize).subscribe({
      next: (tasks) => {
        this.tasks = tasks.data;
        this.total = tasks.items;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setupSearch() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchText) => this.taskService.searchTask(searchText))
      )
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks.data;
          this.total = tasks.items;
        },
        error: (error) => console.log(error),
        complete: () => (this.isLoading = false),
      });
  }

  search(event: any) {
    const searchText: string = event.target.value;
    this.searchSubject.next(searchText);
  }

  add() {
    console.log('add');
  }

  edit(task: ITask) {
    console.log('edit');
  }

  remove(task: ITask) {
    console.log('delete');
  }
}
