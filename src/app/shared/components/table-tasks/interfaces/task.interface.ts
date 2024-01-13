export interface ITask {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
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
