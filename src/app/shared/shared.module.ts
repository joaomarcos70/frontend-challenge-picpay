import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainInputComponent } from './components/inputs/main-input/main-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MainInputComponent],
})
export class SharedModule {}
