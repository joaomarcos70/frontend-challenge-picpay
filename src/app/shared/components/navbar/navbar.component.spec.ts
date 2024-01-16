import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; // Add the import statement for 'of' function from 'rxjs' package

import { NavbarComponent } from './navbar.component';
import { NavigationStateService } from 'src/app/states/navigation-state.service';
import { AuthService } from 'src/app/services/auth/auth.service';

const authServiceStub = {
  logout: (): void => {},
};

const navigationServiceStub = {
  state: () => of(true),
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: NavigationStateService, useValue: navigationServiceStub },
      ],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
