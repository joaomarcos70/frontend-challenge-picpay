import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  create() {
    return this.http.post<IUser>('http://localhost:3030/account', {
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste123',
      image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
    });
  }
}
