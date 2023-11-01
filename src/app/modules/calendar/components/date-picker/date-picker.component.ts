import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from 'src/app/services/redux/store/app.store';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { EventDayDrawerComponent } from '../event-day-drawer/event-day-drawer.component';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Cycle, PredictionCycle } from 'src/app/models/cicle.model';
import { loadedPredictionNextCycle } from 'src/app/services/redux/actions/cycle.action';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements OnInit, OnChanges {
  daysSelected: moment.Moment[] = [];
  isOpen: boolean = true;
  // @ViewChild('calendar') calendar!: MatCalendar<Date>;
  sampleRange!: DateRange<moment.Moment>;

  @Input() cycle: Cycle | any | null = null;
  @Input() averageQuestionCycleContent: number[] = [];
  @Input() cyclesWithOutEndNull: Cycle[] = [];

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

  ngOnChanges(changes: SimpleChanges) {
    this.cdr.detectChanges();
  }

  refreshDR() {
    return this.sampleRange;
  }

  ngOnInit(): void {
    this.cyclesWithOutEndNull?.forEach((cycle: Cycle | any) => {
      const diferenciaEnDias = moment(cycle?.dateEnd).diff(
        moment(cycle?.dateBeging),
        'days'
      );
      this.averageQuestionCycleContent.push(diferenciaEnDias);
    });

    const userId = this.localStorageService.getUserByLogin()?.idUser;
    //Register Cycle
    this.cicleService
      .getCycle(userId, this.cycle?.dateBeging)
      .subscribe((res: any) => {
        if (res) {
          this.initCycle = moment(res?.dateBeging);
          const initCycleOvulation = moment(res?.dateBeging);
          const result = Math.round(
            this.setAverageCycles(this.averageQuestionCycleContent)
          );
          const resultOvulation = result / 2;
          this.endCycle = this.initCycle?.add(result, 'days');
          this.dayOvulation = initCycleOvulation?.add(resultOvulation, 'days');

          this.initPeriod = moment(res?.dateBeging);
          this.endPeriod = moment(res?.dateBeging).add(
            this.cycle?.daysOfBleeding,
            'days'
          );

          this.sampleRange = new DateRange(this.initPeriod, this.endCycle);
          const predictionCycle: PredictionCycle = {
            dateNextPeriod: moment(this.endCycle).add(1, 'day'),
            numberOvulation: resultOvulation,
            period: this.initPeriod,
          };

          this.store.dispatch(
            loadedPredictionNextCycle({ prediction: { ...predictionCycle } })
          );
        }
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
