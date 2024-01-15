import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const loginGuard: CanActivateFn = (
  route,
  state
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const loggedUser = localStorage.getItem('loggedUser');
  console.log(loggedUser);
  return loggedUser ? inject(Router).createUrlTree(['/home']) : false;
};
