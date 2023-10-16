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
import { BehaviorSubject, finalize, map } from 'rxjs';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import * as moment from 'moment';
import {
  setDateCalendar,
  setDayPeriod,
} from 'src/app/redux/actions/calendar.action';
import {
  selectDateCalendar,
  selectDayInitialPeriod,
} from 'src/app/redux/selectors/calendar.selector';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { Cycle } from 'src/app/models/cicle.model';

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

  _selectedDatesSubject = new BehaviorSubject<any[]>([]);
  dates: moment.Moment[] = [];
  eventsDayCalendar: EventCalendar[] = [];
  initCycle!: any;
  Otherdates: moment.Moment[] = [];

  cycle!: Cycle;

  daysSelected: moment.Moment[] = [];

  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService,
    private cicleService: CicleService
  ) {
    // this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    this.cicleService.getAllCycles(userId).subscribe({
      next: (cycles: Cycle[] | any[]) => {
        this.cycle = cycles[0];
        this.store.dispatch(
          setDayPeriod({ initialDate: this.cycle?.dateBeging })
        );
      },
    });
  }

  // isSelected = (event: any) => {
  //   const date = event as moment.Moment;
  //   return (
  //     (this.dates.find((x) => x.isSame(date))
  //       ? 'example-custom-date-class'
  //       : '') || (this.Otherdates.find((x) => x.isSame(date)) ? 'colores' : '')
  //   );
  // };

  // select(event?: any, calendar?: any) {
  //   const date: moment.Moment = event;
  //   const index = this.dates.findIndex((x) => x.isSame(date));
  //   const isSelectable = this.isSelected(date);
  //   if (index < 0) {
  //     this.dates?.push(date);
  //   } else {
  //     this.dates?.splice(index, 1);
  //   }
  //   calendar?.updateTodaysDate();
  // }
}
