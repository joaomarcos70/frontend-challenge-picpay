import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainInputComponent } from './components/inputs/main-input/main-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [MainInputComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MainInputComponent, NavbarComponent],
})
export class SharedModule {}
