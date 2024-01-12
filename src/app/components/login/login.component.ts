import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationStateService } from 'src/app/states/navigation-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationStateService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.navigationService.showNavigationBar(false);
  }

  ngOnDestroy() {
    this.navigationService.showNavigationBar(true);
  }

  login() {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
