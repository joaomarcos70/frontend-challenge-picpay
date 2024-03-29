import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'; // Import the MatPaginatorModule from the correct package
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MainInputComponent } from './components/inputs/main-input/main-input.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableTasksCreateComponent } from './components/table-tasks/table-tasks-create/table-tasks-create.component';
import { TableTasksEditComponent } from './components/table-tasks/table-tasks-edit/table-tasks-edit.component';
import { TableTasksComponent } from './components/table-tasks/table-tasks-list/table-tasks.component';
import { ToastComponent } from './components/toast/toast.component';
import { MatPaginatorIntlPtBr } from './utils/paginator-intl.util.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MainInputComponent,
    NavbarComponent,
    TableTasksComponent,
    TableTasksEditComponent,
    TableTasksCreateComponent,
    ConfirmModalComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MainInputComponent,
    NavbarComponent,
    TableTasksComponent,
    TableTasksEditComponent,
    TableTasksCreateComponent,
    ConfirmModalComponent,
    ToastComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
    BsModalService,
    CurrencyPipe,
    DatePipe,
    provideNgxMask(),
  ],
})
export class SharedModule {}
