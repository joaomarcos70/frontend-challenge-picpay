import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
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
import { TableTasksCreateComponent } from './components/table-tasks/table-tasks-create/table-tasks-create.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { DateFormatPipe } from './utils/pipes/date-format.pipe';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@NgModule({
  declarations: [
    MainInputComponent,
    NavbarComponent,
    TableTasksComponent,
    TableTasksEditComponent,
    TableTasksCreateComponent,
    ConfirmModalComponent,
    DateFormatPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    MainInputComponent,
    NavbarComponent,
    TableTasksComponent,
    TableTasksEditComponent,
    TableTasksCreateComponent,
    ConfirmModalComponent,
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
