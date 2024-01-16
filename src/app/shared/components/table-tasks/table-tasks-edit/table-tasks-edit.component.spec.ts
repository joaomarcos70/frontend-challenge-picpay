import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksEditComponent } from './table-tasks-edit.component';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

const taskServiceStub = {
  edit: () => jest.fn().mockReturnValue(of({})),
};

const bsModalRefStub = {
  hide: (): void => {},
};

describe('TableTasksEditComponent', () => {
  let component: TableTasksEditComponent;
  let fixture: ComponentFixture<TableTasksEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTasksEditComponent],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: taskServiceStub },
        { provide: BsModalRef, useValue: bsModalRefStub },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTasksEditComponent);
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
    expect(component.editForm.controls['value'].value).toEqual('R$ 1.000,00');
  });

  it('should set the value to "R$ 0,00" when the input value is invalid', () => {
    const event = {
      target: {
        value: 'R$ abc',
      },
    };

    component.formatValue(event);

    expect(component.editForm.controls['value'].value).toEqual('R$ 0,00');
  });

  it('should call create method on click button', () => {
    component.editForm.controls['name'].setValue('test');
    component.editForm.controls['title'].setValue('test');
    component.editForm.controls['date'].setValue('01/01/2021');
    component.editForm.controls['value'].setValue('R$ 1.000,00');
    component.editForm.controls['isPayed'].setValue(true);
    fixture.detectChanges();

    const spy = jest.spyOn(component, 'saveTask');

    const button = fixture.nativeElement.querySelector(
      '[data-testid="button-edit"]'
    );
    expect(button).toBeTruthy();
    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
