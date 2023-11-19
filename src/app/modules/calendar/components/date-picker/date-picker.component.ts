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
import {
  DateRange,
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Cycle, PredictionCycle } from 'src/app/models/cicle.model';
import { loadedPredictionNextCycle } from 'src/app/services/redux/actions/cycle.action';
import { Observable, Subscription } from 'rxjs';
import { cyclesUserSelector } from 'src/app/services/redux/selectors/cycle-user.selector';
import { cycleUserInit } from 'src/app/services/redux/actions/cycle/cycle-user.page.action';
import { questionUserMenstruationInit } from 'src/app/services/redux/actions/question-menstruation/question-menstruation-user-page.action';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements OnInit, OnChanges {
  daysSelected: moment.Moment[] = [];
  isOpen: boolean = true;

  sampleRange: DateRange<moment.Moment> = new DateRange(
    moment(null),
    moment(null)
  );

  @Input() cycle: Cycle | any | null = null;
  @Input() averageQuestionCycleContent: number[] = [];
  @Input() cyclesWithOutEndNull: Cycle[] = [];

  @ViewChild('calendar') calendar!: MatCalendar<Date>;

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
    this.calendar?.updateTodaysDate();
    this.cdr.detectChanges();
  }

  refreshDR() {
    this.calendar?.updateTodaysDate();
    return this.sampleRange;
  }

  cyclesUser$: Observable<Cycle> = this.store.select(cyclesUserSelector);
  private cyclesUserSubscription: Subscription | null = null;

  cyclesWithEndNull!: Cycle[] | any;

  ngOnInit(): void {
    this.calendar?.updateTodaysDate();
    const userId = this.localStorageService.getUserByLogin()?.idUser;

    this.store?.dispatch(cycleUserInit());
    this.cyclesUser$?.subscribe(async (dataCycle: any) => {
      if (dataCycle?.length > 0) {
        this.cyclesWithEndNull = await dataCycle?.filter(
          (item: any) => item?.dateEnd === null
        );
        this.cyclesWithOutEndNull = await dataCycle?.filter(
          (item: any) => item?.dateEnd !== null
        );

        //Register Cycle
        if (this.cyclesWithEndNull[0]) {
          this.cicleService
            .getCycle(userId, this.cyclesWithEndNull[0]?.dateBeging)
            .subscribe((res: any) => {
              if (res) {
                this.initCycle = moment(res?.dateBeging);
                let initCycleOvulation = moment(res?.dateBeging);
                let result = Math.round(
                  this.setAverageCycles(this.averageQuestionCycleContent)
                );
                let resultOvulation = result / 2;
                this.endCycle = this.initCycle?.add(result, 'days');
                this.dayOvulation = initCycleOvulation?.add(
                  resultOvulation - 1,
                  'days'
                );

                this.initPeriod = moment(res?.dateBeging);
                this.endPeriod = moment(res?.dateBeging).add(
                  this.cycle?.daysOfBleeding,
                  'days'
                );

                this.sampleRange = new DateRange(
                  this.initPeriod,
                  this.endPeriod.add(-1, 'days')
                );

                const predictionCycle: PredictionCycle = {
                  dateNextPeriod: moment(this.endCycle),
                  numberOvulation: resultOvulation -1,
                  period: this.initPeriod,
                };

                this.store.dispatch(
                  loadedPredictionNextCycle({
                    prediction: { ...predictionCycle },
                  })
                );
                this.calendar?.updateTodaysDate();
              } else {
                this.cdr.detectChanges();
              }
            });
        }

        this.cyclesWithOutEndNull?.forEach((cycle: Cycle | any) => {
          const diferenciaEnDias = moment(cycle?.dateEnd).diff(
            moment(cycle?.dateBeging),
            'days'
          );
          this.averageQuestionCycleContent.push(diferenciaEnDias);
        });
      }
    });

    //TODO: cambiar api para que se pueda buscar por idUser
    this.calendarService
      .getEventsCalendar(userId)
      .subscribe((eventsCalendar: any[]) => {
        if (eventsCalendar) {
          this.eventsNotification = eventsCalendar;
          eventsCalendar
            ?.filter((item) => item?.idUser === userId)
            ?.forEach((event: any) =>
              this.daysSelected.push(moment(event?.date))
            );
          this.daysSelected.push(
            moment(this.localStorageService.getUserByLogin()?.birthdate) //ejemplo agregando el cumple no es evento
          ); //TODO: habra fecha seteada del ciclo
        }
      });
    this.cdr.detectChanges();
  }

  isSelected: MatCalendarCellClassFunction<any> = (event, view) => {
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
      (moment(this.dayOvulation)?.isSame(date) ? 'day-ovulation' : '')
    );
  };

  select(event?: any, calendar?: any): void {
    this.daysSelected?.find((date: any) => date?.isSame(event));
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
