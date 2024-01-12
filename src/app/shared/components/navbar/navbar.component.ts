import { Component } from '@angular/core';
import { NavigationStateService } from 'src/app/states/navigation-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoading = true;
  showNavBar = false;
  constructor(private navigationStateService: NavigationStateService) {}

  ngOnInit(): void {
    this.navigationStateService.state().subscribe((show) => {
      this.showNavBar = show;
    });
  }
}
