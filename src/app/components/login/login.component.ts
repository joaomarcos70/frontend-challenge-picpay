import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastType } from 'src/app/shared/components/toast/toast.component';
import { NavigationStateService } from 'src/app/states/navigation-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  toastMessage = '';
  showToast = false;
  toastType: ToastType = 'success';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationStateService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.navigationService.showNavigationBar(false);
  }

  ngOnDestroy() {
    this.navigationService.showNavigationBar(true);
  }

  handleToast(message: string, type: ToastType) {
    this.showToast = true;
    this.toastMessage = message;
    this.toastType = type;
  }

  hideToast() {
    this.showToast = false;
    this.toastMessage = '';
    this.toastType = 'success';
  }

  login() {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (user) => {
          if (user) {
            localStorage.setItem(
              'loggedUser',
              JSON.stringify({ email: user.email, name: user.name })
            );
            this.router.navigate(['/home']);
          } else {
            this.handleToast('usuário ou senha inválidos', 'error');
          }
        },
        error: () => {
          this.handleToast('erro ao fazer login', 'error');
        },
      });
  }
}
