import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TableTasksComponent } from './table-tasks.component';
import { TaskService } from 'src/app/services/task.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, of, throwError } from 'rxjs';
import { ITask, IResponseTask } from '../interfaces/task.interface';

const taskServiceStub = {
  getTasks: jest.fn().mockReturnValue(of([])),
  delete: jest.fn().mockReturnValue(of([])),
};

const modalServiceStub = {
  show: (): void => {},
};

const datePipeStub = {
  transform: (): void => {},
};

const task: ITask = {
  id: 1,
  name: 'test',
  title: 'test',
  isPayed: true,
  image: 'test',
  username: 'test',
  value: 10,
  date: new Date().toISOString(),
};

const taskResponse: IResponseTask = {
  data: [
    {
      id: 1,
      name: 'test',
      title: 'test',
      isPayed: true,
      image: 'test',
      username: 'test',
      value: 10,
      date: new Date().toISOString(),
    },
  ],
  items: 1,
  pages: 1,
  first: 0,
  prev: 0,
  next: 0,
  last: 0,
};

class modalBsMockCLass {
  content = {
    closeBtnName: '',
    onHidden: new Subject<{ id: number }>(),
  };
  hide() {}
}

describe('TableTasksComponent', () => {
  let component: TableTasksComponent;
  let fixture: ComponentFixture<TableTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTasksComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceStub },
        { provide: BsModalService, useValue: modalServiceStub },
        { provide: DatePipe, useValue: datePipeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filter method on ngOnInit', () => {
    const filterSpy = jest.spyOn(component, 'filter');
    component.ngOnInit();
    expect(filterSpy).toHaveBeenCalled();
  });

  it('should call filter method on handleFilter', () => {
    const filterSpy = jest.spyOn(component, 'filter');
    const filter = 'name';
    component.handleFilter(filter);
    expect(filterSpy).toHaveBeenCalled();
  });

  it('should call getTasks from taskService when typing in the search input', fakeAsync(() => {
    const spy = jest.spyOn(taskServiceStub, 'getTasks');
    const input = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="search-input"]'
    );
    expect(input).toBeTruthy();

    input.value = 'teste';
    input.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();
    tick(500);
    expect(spy).toHaveBeenCalled();
  }));

  it('should be loading false after getTasks from taskService', fakeAsync(() => {
    const spy = jest
      .spyOn(taskServiceStub, 'getTasks')
      .mockReturnValue(of({ data: [] }));
    const input = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="search-input"]'
    );
    input.value = 'teste';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
    expect(spy).toHaveBeenCalled();
  }));

  it('should handle page event and call searchSubject.next when name is provided', () => {
    const spy = jest.spyOn(component.searchSubject, 'next');

    const event = {
      pageSize: 10,
      pageIndex: 0,
    };
    component.filterForm.controls['name'].setValue('teste');

    component.handlePageEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle page event and call filter when no name is provided', () => {
    const spy = jest.spyOn(component, 'filter');

    const event = {
      pageSize: 10,
      pageIndex: 0,
    };

    component.handlePageEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should update page and call filter when onNext is called', () => {
    const spy = jest.spyOn(component, 'filter');
    component.next = 2;

    component.onNext();

    expect(component.page).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should open modal when add is clicked', () => {
    let modalBsMock = new modalBsMockCLass();
    const spyAdd = jest.spyOn(component, 'add');

    const modalServiceSpy = jest
      .spyOn(modalServiceStub, 'show')
      .mockImplementation(() => modalBsMock);

    const buttonAdd = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="add-btn-task"]'
    );

    buttonAdd.click();
    fixture.detectChanges();

    fixture.detectChanges();

    expect(spyAdd).toHaveBeenCalled();
    expect(modalServiceSpy).toHaveBeenCalled();
  });

  it('should set showConfirmModal to false on closeConfirmModal', () => {
    component.closeConfirmModal();
    expect(component.showConfirmModal).toBe(false);
  });

  it('should set toastShow to false and toastMessage to empty string on hideToast', () => {
    component.hideToast();
    expect(component.toastShow).toBe(false);
    expect(component.toastMessage).toBe('');
  });

  it('should set toastShow to true and toastMessage to the provided message on showToast', () => {
    const message = 'Test message';
    component.showToast(message);
    expect(component.toastShow).toBe(true);
    expect(component.toastMessage).toBe(message);
  });

  it('should call delete method on taskService and filter method on remove', () => {
    const deleteSpy = jest
      .spyOn(taskServiceStub, 'delete')
      .mockReturnValue(of({}));
    const filterSpy = jest.spyOn(component, 'filter');
    component.remove(task);
    expect(deleteSpy).toHaveBeenCalledWith(task);
    expect(filterSpy).toHaveBeenCalled();
  });
});
