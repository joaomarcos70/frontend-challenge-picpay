export interface ITask {
  id: string;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
}

export type IOrderBY = 'asc' | 'desc';

export interface ITaskSort {
  sortBy: string;
  orderBy: IOrderBY;
}

export interface ITaskPaginate {
  _page: number;
  _limit: number;
  _start: number;
  _end: number;
}

export interface IResponseTask {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: ITask[];
}
