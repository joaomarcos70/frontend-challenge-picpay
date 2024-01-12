import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    return this.http.get<any>(`http://localhost:3030/account`);
  }
}
