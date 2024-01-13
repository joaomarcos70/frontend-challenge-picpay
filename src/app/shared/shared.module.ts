import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainInputComponent } from './components/inputs/main-input/main-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableTasksComponent } from './components/table-tasks/table-tasks.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'; // Import the MatPaginatorModule from the correct package
import { MatPaginatorIntlPtBr } from './utils/paginator-intl.util.service';
@NgModule({
  declarations: [MainInputComponent, NavbarComponent, TableTasksComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatPaginatorModule],
  exports: [MainInputComponent, NavbarComponent, TableTasksComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr }],
})
export class SharedModule {}
