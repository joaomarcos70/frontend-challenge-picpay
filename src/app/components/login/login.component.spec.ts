import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationStateService } from 'src/app/states/navigation-state.service';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
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

  it('should be login when submit button is clicked', () => {
    const spyLogin = jest.spyOn(component, 'login');

    component.loginForm.controls['username'].setValue('teste@teste.com');
    component.loginForm.controls['password'].setValue('teste123');
    fixture.detectChanges();

    const buttonSubmit = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="button-submit"]'
    );

    buttonSubmit.click();
    fixture.detectChanges();

    expect(buttonSubmit).toBeTruthy();
    expect(spyLogin).toHaveBeenCalled();
    expect(spyLogin).toHaveBeenCalledTimes(1);
  });
});
