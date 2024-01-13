import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainInputComponent } from './components/inputs/main-input/main-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableTasksComponent } from './components/table-tasks/table-tasks.component';

@NgModule({
  declarations: [MainInputComponent, NavbarComponent, TableTasksComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MainInputComponent, NavbarComponent, TableTasksComponent],
})
export class SharedModule {}
