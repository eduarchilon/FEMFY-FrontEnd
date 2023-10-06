import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent {
  selectedDates: Date[] = [];
  selected!: Date | any;
  numberDay!: number;

  constructor(private router: Router, private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('es-ES');
  }

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  
  onSelect(event?: any): void {
    this.selected = event;
    const selectedDateIndex = this.selectedDates?.findIndex((date) =>
      this.dateAdapter?.sameDate(date, this.selected)
    );
    if (selectedDateIndex === -1) {
      this.selectedDates?.push(this.selected);
    } else {
      this.selectedDates?.splice(selectedDateIndex, 1);
    }
    this.calendar.updateTodaysDate();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (
      this.selectedDates?.some((selectedDate) =>
        this.dateAdapter?.sameDate(selectedDate, cellDate)
      )
    ) {
      return 'example-custom-date-class';
    }
    return '';
  };
}
