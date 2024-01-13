import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksEditComponent } from './table-tasks-edit.component';

describe('TableTasksEditComponent', () => {
  let component: TableTasksEditComponent;
  let fixture: ComponentFixture<TableTasksEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTasksEditComponent]
    });
    fixture = TestBed.createComponent(TableTasksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
