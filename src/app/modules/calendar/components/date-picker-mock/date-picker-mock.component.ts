import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AppState } from 'src/app/services/redux/store/app.store';
import { EventDayDrawerComponent } from '../event-day-drawer/event-day-drawer.component';

@Component({
  selector: 'app-date-picker-mock',
  templateUrl: './date-picker-mock.component.html',
  styleUrls: ['./date-picker-mock.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerMockComponent implements OnInit {
  daysSelected: moment.Moment[] = [];
  isOpen: boolean = true;
  @ViewChild('calendar') datePicker!: MatCalendar<Date>;

  eventsNotification: EventCalendar[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;

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
          moment(this.localStorageService.getUserByLogin()?.birthdate)
        );
      });
    this.cdr.detectChanges();
  }

  isSelected = (event: any) => {
    const date = event as moment.Moment;
    return this.daysSelected?.find((x) => x.isSame(date, 'days'))
      ? 'selected-day'
      : '';
  };

  select(event?: any, datePicker?: any): void {
    const eventFinded = this.daysSelected?.find((date: any) =>
      date?.isSame(event)
    );
    datePicker?.updateTodaysDate();
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
