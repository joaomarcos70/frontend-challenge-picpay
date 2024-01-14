import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IResponseTask,
  ITask,
} from '../shared/components/table-tasks/interfaces/task.interface';
import { Observable, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(filters: ITask, page: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', filters.name);
    params = params.append('_page', page);
    params = params.append('_per_page', pageSize);
    return this.http.get<any>(`http://localhost:3030/tasks`, { params });
  }

  edit(task: ITask) {
    return this.http.patch(`http://localhost:3030/tasks/${task.id}`, task);
  }

  create(task: ITask) {
    return this.http.post(`http://localhost:3030/tasks`, task);
  }

  delete(task: ITask) {
    return this.http.delete(`http://localhost:3030/tasks/${task.id}`);
  }
}
