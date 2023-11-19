import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule } from '../../calendar.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';

fdescribe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      imports: [MatDialogModule, CalendarModule, MatDatepickerModule, HttpClientModule],
      providers: [ { provide: Store, useValue: {} },]
    });
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
