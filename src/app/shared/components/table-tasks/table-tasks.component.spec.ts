import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTasksComponent } from './table-tasks.component';

describe('TableTasksComponent', () => {
  let component: TableTasksComponent;
  let fixture: ComponentFixture<TableTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTasksComponent]
    });
    fixture = TestBed.createComponent(TableTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
