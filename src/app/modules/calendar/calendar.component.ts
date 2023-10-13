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
  eventsDayCalendar: EventCalendar[] = [];
  initCycle!: any;
  Otherdates: moment.Moment[] = [];

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
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.dialog.closeAll();
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
    });

    this.cicleService
      .getAllCycles(this.localStorageService.getUserByLogin()?.idUser)
      .subscribe((data: any) => {
        console.log(data[0]);
        this.store.dispatch(setDayPeriod({ initialDate: data[0]?.dateBeging }));
      });

    this.calendarService
      .getEventsCalendar(this.userResponse?.idUser)
      .subscribe((data: any[]) => {
        //filtro por eventos
        const eventsIdUser = data.filter(
          (item) => item.idUser === this.userResponse?.idUser
        );
        const arraysFiltrados: any = [];
        const fechasProcesadas: any = [];
        eventsIdUser.forEach((item) => {
          const fecha = item.date;
          if (!fechasProcesadas.includes(fecha)) {
            const objetosConFecha = eventsIdUser.filter(
              (obj) => obj.date === fecha
            );
            arraysFiltrados.push(objetosConFecha);
            fechasProcesadas.push(fecha);
          }
        });
        this.eventsDayCalendar = arraysFiltrados;
        //filtro por fehas para eleccionar
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
        this.select(moment(element), this.calendar);
      });
    });

    this.store.select(selectDayInitialPeriod).subscribe((day: any) => {
      this.Otherdates.push(moment(day?.initialDate));
    });
  }

  isSelected = (event: any) => {
    this.store.select(selectDateCalendar).subscribe((item: any) => {
      // console.log("holi", item);
      item?.dates?.forEach((element: any) => {
        this.dates.push(moment(element));
      });
    });
    const date = event as moment.Moment;
    return (
      (this.dates.find((x) => x.isSame(date))
        ? 'example-custom-date-class'
        : '') || (this.Otherdates.find((x) => x.isSame(date)) ? 'colores' : '')
    );
  };

  select(event?: any, calendar?: any) {
    const date: moment.Moment = event;
    const index = this.dates.findIndex((x) => x.isSame(date));
    const isSelectable = this.isSelected(date);
    if (index < 0) {
      this.dates?.push(date);
    } else {
      this.dates?.splice(index, 1);
    }
    calendar?.updateTodaysDate();
  }

  isDaySelected(day: moment.Moment): boolean {
    return !!this.dates?.find((date: any) => date.date() === day.date());
  }

  selectDate(event: any) {
    this.openDialog(event);
  }

  showFiller = false;
  @ViewChild('date') date!: MatCalendar<Date>;
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  //@ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  openDialog(data: any) {
    this.dialog.open(EventDayDrawerComponent, {
      panelClass: [
        'max-md:!w-[50%]',
        'max-sm:!w-[90%]',
        '!w-[40%]',
        '!rounded-[20px]',
      ],
      data: {
        data: data,
        events: this.eventsDayCalendar,
      },
    });
  }
}
