import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationStateService } from 'src/app/states/navigation-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoading = false;
  showNavBar = false;
  openSettings = false;

  constructor(
    private navigationStateService: NavigationStateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.navigationStateService.state().subscribe((show) => {
      this.showNavBar = show;
    });
  }

  handleOpenSettings() {
    this.openSettings = !this.openSettings;
  }

  logout() {
    this.authService.logout();
    this.openSettings = false;
  }
}
