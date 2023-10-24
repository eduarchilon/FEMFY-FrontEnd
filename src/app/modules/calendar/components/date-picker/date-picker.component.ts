import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from 'src/app/redux/store/app.store';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { EventDayDrawerComponent } from '../event-day-drawer/event-day-drawer.component';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Cycle } from 'src/app/models/cicle.model';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { selectNumberOfOvulation } from 'src/app/redux/selectors/calendar.selector';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements OnInit {
  daysSelected: moment.Moment[] = [];
  isOpen: boolean = true;
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  sampleRange!: DateRange<moment.Moment>;

  @Input() cycle: Cycle | any | null = null;
  @Input() myRegisterQuestion!: QuestionUserMenstruation;

  initCycle: moment.Moment | null = null;
  endCycle: moment.Moment | null = null;
  initBleeding: moment.Moment | null = null;
  finishBleeding: moment.Moment | null = null;
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
    //Register Cycle
    this.cicleService
      .getCycle(userId, this.cycle?.dateBeging) //TODO: ojo con la fecha no es igual al valor que tiene java
      .subscribe((res: any) => {
        this.initCycle = moment(res?.dateBeging);
        this.store.select(selectNumberOfOvulation).subscribe((data: any) => {
          this.dayOvulation = moment(res?.dateBeging).add(
            data?.numberOvulation,
            'days'
          );
          this.endCycle = moment(res?.dateBeging).add(
            this.cycle?.daysOfBleeding - 1,
            'days'
          );
          // this.endCycle?.add(this.cycle.dayOfBleding, 'days');
          const predictionNextPeriod = this.endCycle?.diff(
            moment(new Date()),
            'days'
          );
        });
        this.sampleRange = new DateRange(this.initCycle, this.endCycle);
      });
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
      date?.isSame(this.initCycle)
    );
    //elimino la lista de eventos del inicio del ciclo para diferenciarlo
    if (index !== -1) {
      this.daysSelected?.splice(index, 1);
    }
    const date = event as moment.Moment;

    return (
      (this.daysSelected?.find((x) => x.isSame(date)) ? 'selected' : '') ||
      (moment(this.initCycle)?.isSame(date) ? 'init-cycle' : '') ||
      (moment(this.endCycle)?.isSame(date) ? 'end-cycle' : '') ||
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
}
