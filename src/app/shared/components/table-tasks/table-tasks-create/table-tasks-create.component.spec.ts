import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksCreateComponent } from './table-tasks-create.component';

describe('TableTasksCreateComponent', () => {
  let component: TableTasksCreateComponent;
  let fixture: ComponentFixture<TableTasksCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTasksCreateComponent]
    });
    fixture = TestBed.createComponent(TableTasksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
