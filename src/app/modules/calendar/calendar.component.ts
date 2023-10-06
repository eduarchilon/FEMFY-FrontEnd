import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  DateRange,
} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventDayDrawerComponent } from './components/event-day-drawer/event-day-drawer.component';

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

  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<any>,
    public dialog: MatDialog
  ) {
    this.dateAdapter.setLocale('es-ES');
  }
  showFiller = false;
  @ViewChild('date') date!: MatCalendar<Date>;
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  onSelect(event?: DateRange<any> | any): void {
    this.openDialog();
    const selected = event;
    const isSelected = this.isDaySelected(selected);
    const selectedDateIndex = this.selectedDates?.findIndex((date) =>
      this.dateAdapter?.sameDate(date, selected)
    );
    if (selectedDateIndex === -1) {
      this.selectedDates?.push(selected);
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

  isDaySelected(day: Date): boolean {
    return !!this.selectedDates?.find((date) =>
      this.dateAdapter?.sameDate(date, day)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(EventDayDrawerComponent, {
      panelClass: [
        'max-md:!w-[80%]',
        'max-sm:!w-[100%]',
        '!max-w-[100vw]',
        '!w-[60%]',
        'max-md:!h-[80%]',
        'max-sm:!h-[100%]',
        '!h-[500px%]',
      ],
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
