import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputComponent } from './main-input.component';

describe('MainInputComponent', () => {
  let component: MainInputComponent;
  let fixture: ComponentFixture<MainInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainInputComponent],
    });
    fixture = TestBed.createComponent(MainInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should show text when onHideShowText is called`, () => {
    const spy = jest.spyOn(component, 'onHideShowText');
    component.showContent = true;
    component.type = 'password';

    component.onHideShowText();
    expect(spy).toHaveBeenCalled();
    expect(component.type).toBe('text');
  });

  it(`should emit keyUp event when onKeyUp is called`, () => {
    const event = new KeyboardEvent('keyup');
    const spy = jest.spyOn(component.keyUp, 'emit');

    component.onKeyUp(event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it(`should update internalValue when writeValue is called`, () => {
    component.writeValue('test');
    expect(component.internalValue).toBe('test');
  });

  it(`should call onChange and emit change event when changeValue is called`, () => {
    const event = { target: { value: 'test' } };
    const spyOnChange = jest.spyOn(component, 'onChange');
    const spyChange = jest.spyOn(component.change, 'emit');

    component.changeValue(event);
    expect(spyOnChange).toHaveBeenCalledWith('test');
    expect(spyChange).toHaveBeenCalledWith(event);
  });

  it(`should register onChange and onTouched when registerOnChange and registerOnTouched are called`, () => {
    const onChangeFn = jest.fn();
    const onTouchedFn = jest.fn();

    component.registerOnChange(onChangeFn);
    component.registerOnTouched(onTouchedFn);

    expect(component.onChange).toBe(onChangeFn);
    expect(component.onTouched).toBe(onTouchedFn);
  });
});
