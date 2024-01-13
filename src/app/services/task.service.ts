import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IResponseTask,
  ITask,
} from '../shared/components/table-tasks/interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(pageSize: number): Observable<IResponseTask> {
    return this.http.get<IResponseTask>(
      `http://localhost:3030/tasks?_page=${pageSize}`
    );
  }

  searchTask(search: string): Observable<IResponseTask> {
    return this.http.get<IResponseTask>(
      `http://localhost:3030/tasks?name=${search}`
    );
  }
}
