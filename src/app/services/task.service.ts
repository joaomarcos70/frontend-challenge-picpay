import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IResponseTask,
  ITask,
  ITaskSort,
} from '../shared/components/table-tasks/interfaces/task.interface';
import { Observable, filter, map } from 'rxjs';
import { IFilters } from '../shared/components/table-tasks/table-tasks-list/table-tasks.component';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(
    filters: IFilters,
    sort: ITaskSort,
    page: number,
    pageSize: number
  ): Observable<IResponseTask> {
    let params = new HttpParams();
    params = params.append('name_like', filters.name);
    if (filters.isPayed === null) {
      params = params.append('isPayed', true);
      params = params.append('isPayed', false);
    }
    if (filters.startDate) {
      params = params.append(
        'date_gte',
        new Date(filters.startDate).toISOString()
      );
    }

    if (filters.endDate) {
      params = params.append(
        'date_lte',
        new Date(filters.endDate).toISOString()
      );
    }

    params = params.append('isPayed', filters.isPayed);
    params = params.append('_sort', sort.sortBy);
    params = params.append('_order', sort.orderBy);
    params = params.append('_page', page.toString());
    params = params.append('_limit', pageSize.toString());
    return this.http
      .get<ITask[]>(`http://localhost:3030/tasks`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res: HttpResponse<ITask[]>) => {
          console.log(res);
          const totalItems = res.headers.get('X-Total-Count');
          const totalPages = Math.ceil(Number(totalItems) / pageSize);
          const links = res.headers.get('Link');
          console.log(links);
          const data = res.body;

          const response: IResponseTask = {
            first: 1,
            prev: page - 1,
            next: page + 1,
            last: totalPages,
            pages: totalPages,
            items: Number(totalItems),
            data: data as ITask[],
          };
          return response;
        })
      );
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
