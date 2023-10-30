import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AppState } from 'src/app/services/redux/store/app.store';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { EventDayDrawerComponent } from '../event-day-drawer/event-day-drawer.component';

@Component({
  selector: 'app-date-picker-mock',
  templateUrl: './date-picker-mock.component.html',
  styleUrls: ['./date-picker-mock.component.scss'],
})
export class DatePickerMockComponent implements OnInit {
  daysSelected: moment.Moment[] = [];
  isOpen: boolean = true;
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  sampleRange!: DateRange<moment.Moment>;

  initPeriod: moment.Moment | null = null;
  endPeriod: moment.Moment | null = null;
  initCycle: moment.Moment | null = null;
  endCycle: moment.Moment | null | any = null;
  dayOvulation: moment.Moment | null = null;

  eventsNotification: EventCalendar[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService,
    private cicleService: CicleService,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {
    this.refreshDR();
  }

  refreshDR() {
    return this.sampleRange;
  }

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;

    //TODO: cambiar api para que se pueda buscar por idUser
    this.calendarService
      .getEventsCalendar(userId)
      .subscribe((eventsCalendar: any[]) => {
        this.eventsNotification = eventsCalendar;
        eventsCalendar
          ?.filter((item) => item?.idUser === userId)
          ?.forEach((event: any) =>
            this.daysSelected.push(moment(event?.date))
          );
        this.daysSelected.push(
          moment(this.localStorageService.getUserByLogin()?.birthdate) //ejemplo agregando el cumple no es evento
        ); //TODO: habra fecha seteada del ciclo
      });
    this.cdr.detectChanges();
  }

  isSelected = (event: any) => {
    const index = this.daysSelected?.findIndex((date: any) =>
      date?.isSame(this.initPeriod)
    );
    //elimino la lista de eventos del inicio del ciclo para diferenciarlo
    if (index !== -1) {
      this.daysSelected?.splice(index, 1);
    }
    const date = event as moment.Moment;

    return (
      (this.daysSelected?.find((x) => x.isSame(date, 'day'))
        ? 'selected'
        : '') ||
      (moment(this.endPeriod)?.isSame(date) ? 'end-period' : '') ||
      (moment(this.dayOvulation)?.isSame(date) ? 'day-ovulation' : '')
    );
  };

  select(event?: any, calendar?: any): void {
    const eventFinded = this.daysSelected?.find((date: any) =>
      date?.isSame(event)
    );
    calendar?.updateTodaysDate();
  }

  openDialog(daySelected: any) {
    this.dialog.open(EventDayDrawerComponent, {
      panelClass: [
        '!max-w-[95vw]',
        'max-lg:!w-[80%]',
        'max-md:!w-[100vw]',
        'max-xl:!w-[50%]',
        '!w-[50%]',
        '!rounded-[20px]',
      ],
      data: {
        daySelected,
      },
    });
  }

  selectDate(event: any) {
    this.openDialog(event);
  }

  setAverageCycles(averageQuestionCycleContent?: number[] | any): number {
    const total: number | any = averageQuestionCycleContent?.reduce(
      (total: any, num: any) => total + num,
      0
    );
    averageQuestionCycleContent?.reduce(
      (total: any, num: any) => total + num,
      0
    );
    const daysCycleComplete = total / averageQuestionCycleContent?.length;
    return daysCycleComplete;
  }
}
