import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationStateService {
  private showNavBar = new BehaviorSubject<boolean>(true);

  constructor() {}

  showNavigationBar(show: boolean) {
    this.showNavBar.next(show);
  }

  state() {
    return this.showNavBar.asObservable();
  }
}
