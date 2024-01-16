import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, find, from, map, merge, mergeAll } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user/user.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .get<IUser[]>(`http://localhost:3030/account`)
      .pipe(
        map((users) => from(users)),
        mergeAll(),
        find((user) => user.email === username && user.password === password)
      )
      .subscribe({
        next: (user) => {
          if (user) {
            localStorage.setItem(
              'loggedUser',
              JSON.stringify({ email: user.email, name: user.name })
            );
            this.router.navigate(['/home']);
          } else {
            alert('User not found');
          }
        },

        error: () => {
          alert('Error');
        },
      });
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
