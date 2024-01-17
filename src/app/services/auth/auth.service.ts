import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, find, from, map, merge, mergeAll } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user/user.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<IUser[]>(`http://localhost:3030/account`).pipe(
      map((users) => from(users)),
      mergeAll(),
      find((user) => user.email === username && user.password === password)
    );
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
