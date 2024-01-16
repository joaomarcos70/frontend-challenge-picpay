import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksCreateComponent } from './table-tasks-create.component';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const taskServiceStub = {
  create: () => jest.fn().mockReturnValue(of({})),
};

const bsModalRefStub = {
  hide: () => {},
};

describe('TableTasksCreateComponent', () => {
  let component: TableTasksCreateComponent;
  let fixture: ComponentFixture<TableTasksCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTasksCreateComponent],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: taskServiceStub },
        { provide: BsModalRef, useValue: bsModalRefStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTasksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format the value correctly', () => {
    const event = {
      target: {
        value: 'R$ 1.000,00',
      },
    };

    component.formatValue(event);
    expect(component.formCreate.controls['value'].value).toEqual('R$ 1.000,00');
  });

  it('should set the value to "R$ 0,00" when the input value is invalid', () => {
    const event = {
      target: {
        value: 'R$ abc',
      },
    };

    component.formatValue(event);

    expect(component.formCreate.controls['value'].value).toEqual('R$ 0,00');
  });

  it('should call create method on click button', () => {
    component.formCreate.controls['name'].setValue('test');
    component.formCreate.controls['title'].setValue('test');
    component.formCreate.controls['date'].setValue('01/01/2021');
    component.formCreate.controls['value'].setValue('R$ 1.000,00');
    component.formCreate.controls['isPayed'].setValue(true);
    fixture.detectChanges();

    const spy = jest.spyOn(component, 'create');

    const button = fixture.nativeElement.querySelector(
      '[data-testid="button-create"]'
    );
    expect(button).toBeTruthy();
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
