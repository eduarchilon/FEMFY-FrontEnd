import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  DateRange,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventDayDrawerComponent } from './components/event-day-drawer/event-day-drawer.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AppState } from 'src/app/redux/store/app.store';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import * as moment from 'moment';
import { setDateCalendar } from 'src/app/redux/actions/calendar.action';
import { selectDateCalendar } from 'src/app/redux/selectors/calendar.selector';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  selectedDates: Date[] = [];
  selected!: Date | any;
  numberDay!: number;

  userResponse!: UserResponse;

  _selectedDatesSubject = new BehaviorSubject<any[]>([]);
  // selectedDates$ = this.selectedDatesSubject.asObservable();
  dates: moment.Moment[] = [];

  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
    });

    this.calendarService
      .getEventsCalendar(this.userResponse?.idUser)
      .subscribe((data: any[]) => {
        this.selectedDates = [
          ...Array.from(
            new Set(
              data
                .filter(
                  (dates: any) => dates?.idUser === this.userResponse?.idUser
                )
                .map((date: any) => date?.date)
            )
          ),
        ];
        this.store.dispatch(setDateCalendar({ dates: this.selectedDates }));
        this._selectedDatesSubject.next(
          this.selectedDates.map((item: any) => (item ? moment(item) : []))
        );
      });

    this.store.select(selectDateCalendar).subscribe((item: any) => {
      item?.dates?.forEach((element: any) => {
        element && this.select(moment(element), this.calendar);
      });
    });
  }

  isSelected = (event: any) => {
    this.store.select(selectDateCalendar).subscribe((item: any) => {
      item?.dates?.forEach((element: any) => {
        this.dates.push(moment(element));
      });
    });
    const date = event as moment.Moment;
    return this.dates.find((x) => x.isSame(date))
      ? 'example-custom-date-class'
      : '';
  };

  select(event?: any, calendar?: any) {
    const date: moment.Moment = event;
    const index = this.dates.findIndex((x) => x.isSame(date));
    if (index < 0) {
      this.dates?.push(date);
    } else {
      this.dates?.splice(index, 1);
    }
    calendar?.updateTodaysDate();
  }

  showFiller = false;
  @ViewChild('date') date!: MatCalendar<Date>;
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  //@ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

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
