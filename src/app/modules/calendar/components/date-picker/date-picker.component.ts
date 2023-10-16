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
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements OnInit {
  daysSelected: moment.Moment[] = [];
  isOpen: boolean = true;
  @ViewChild('date') date!: MatCalendar<Date>;
  @ViewChild('calendar') calendar!: MatCalendar<Date>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService,
    private cicleService: CicleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    //TODO: cambiar api para que se pueda buscar por idUser
    this.calendarService
      .getEventsCalendar(userId)
      .subscribe((eventsCalendar: any[]) => {
        eventsCalendar
          ?.filter((item) => item?.idUser === userId)
          ?.forEach((event: any) =>
            this.daysSelected.push(moment(event?.date))
          );
        this.daysSelected.push(moment(new Date(1992, 8, 15))); //TODO: habra fecha seteada del ciclo
      });
  }

  isSelected = (event: any) => {
    const date = event as moment.Moment;
    return this.daysSelected?.find((x) => x.isSame(date)) ? 'selected' : '';
  };

  select(event?: any, calendar?: any): void {
    const date: moment.Moment = event;
    const index = this.daysSelected?.findIndex((x) => x.isSame(date));
    if (index < 0) {
      this.daysSelected?.push(date);
    } else {
      this.daysSelected?.splice(index, 1);
    }
    calendar?.updateTodaysDate();
  }

  openDialog(daySelected: any) {
    this.dialog.open(EventDayDrawerComponent, {
      panelClass: [
        'max-md:!w-[50%]',
        'max-sm:!w-[90%]',
        '!w-[40%]',
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
