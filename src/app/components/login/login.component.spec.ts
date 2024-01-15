import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationStateService } from 'src/app/states/navigation-state.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceStub = {
    login: (): void => {},
  };

  const navigationServiceStub = {
    showNavigationBar: () => {},
    state: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, AuthService, NavigationStateService],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: NavigationStateService, useValue: navigationServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*   it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should have required validators for username and password fields', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    usernameControl.setValue('');
    passwordControl.setValue('');

    expect(usernameControl.hasError('required')).toBe(true);
    expect(passwordControl.hasError('required')).toBe(true);
  });

  it('should have email validator for username field', () => {
    const usernameControl = component.loginForm.get('username');

    usernameControl.setValue('invalid-email');

    expect(usernameControl.hasError('email')).toBe(true);
  });

  it('should have minimum length validator for password field', () => {
    const passwordControl = component.loginForm.get('password');

    passwordControl.setValue('12345');

    expect(passwordControl.hasError('minlength')).toBe(true);
  });

  it('should call authService.login when login is called', () => {
    spyOn(component.authService, 'login');

    component.loginForm.setValue({
      username: 'test@example.com',
      password: 'password123',
    });

    component.login();

    expect(component.authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  }); */
});
