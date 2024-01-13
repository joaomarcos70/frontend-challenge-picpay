import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'; // Import the MatPaginatorModule from the correct package
import { MainInputComponent } from './components/inputs/main-input/main-input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableTasksEditComponent } from './components/table-tasks/table-tasks-edit/table-tasks-edit.component';
import { TableTasksComponent } from './components/table-tasks/table-tasks-list/table-tasks.component';
import { MatPaginatorIntlPtBr } from './utils/paginator-intl.util.service';
import { BsModalService } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    MainInputComponent,
    NavbarComponent,
    TableTasksComponent,
    TableTasksEditComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatPaginatorModule],
  exports: [
    MainInputComponent,
    NavbarComponent,
    TableTasksComponent,
    TableTasksEditComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
    BsModalService,
  ],
})
export class SharedModule {}
