import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMockComponent } from './date-picker-mock.component';

describe('DatePickerMockComponent', () => {
  let component: DatePickerMockComponent;
  let fixture: ComponentFixture<DatePickerMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerMockComponent]
    });
    fixture = TestBed.createComponent(DatePickerMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
