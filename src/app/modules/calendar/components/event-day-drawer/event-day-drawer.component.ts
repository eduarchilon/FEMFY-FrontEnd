import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { data } from 'src/app/constans/pie-chart-data';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-event-day-drawer',
  templateUrl: './event-day-drawer.component.html',
  styleUrls: ['./event-day-drawer.component.scss'],
})
export class EventDayDrawerComponent implements OnInit {
  panelOpenState = false;
  userResponse!: UserResponse;
  hourSelected: string = '';
  eventDaySelected: any[] = []; // eventos por hora
  eventsDayCalendar: EventCalendar[] = [];
  selectedDates: Date[] = []; //Eventos de la fecha seleccionada

  formRegisterEvent: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
  });

  spinnerConsumer: string = 'EventDayDrawerComponent';

  constructor(
    private dialogRef: MatDialogRef<EventDayDrawerComponent>,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService,
    private loaderService: LoaderService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any //fecha
  ) {}

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    //TODO: cambiar api para que se pueda buscar por idUser
    this.calendarService
      .getEventsCalendar(userId)
      .subscribe((eventsCalendar: any[]) => {
        //filtro por usuario
        const eventsIdUser = eventsCalendar.filter(
          (item) => item.idUser === userId
        );
        const arraysFiltrados: any = [];
        const procedDates: any = [];
        eventsIdUser?.forEach((event: any) => {
          const dayEvent = event?.date;
          if (!procedDates.includes(dayEvent)) {
            const objetosConFecha = eventsIdUser.filter(
              (obj) => obj.date === dayEvent
            );
            arraysFiltrados.push(objetosConFecha); //eventos filtrados
            procedDates.push(dayEvent); // fechas procesadas osea no repetidas
          }
        });
        this.eventsDayCalendar = arraysFiltrados;
        this.eventsDayCalendar?.forEach((date: any) => {
          //filtro por fecha
          date?.forEach((item: any) => {
            if (
              moment(new Date(item.date)).date() ===
              this.data?.daySelected?.date()
            ) {
              this.eventDaySelected.push(item);
              console.log(this.eventDaySelected);
            }
          });
        });
      });
  }

  setHourToShow(hour: string) {
    this.hourSelected = hour;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  registerEevent(): void {
    this.closeDialog();
    this.loaderService.showLoader();
    this.calendarService
      .setEvent({
        idUser: this.localStorageService.getUserByLogin()?.idUser,
        description: this.formRegisterEvent?.value?.description,
        title: this.formRegisterEvent?.value?.title,
        hour: this.formRegisterEvent?.value?.hour,
        date: this.data?.daySelected,
      })
      .subscribe({
        next: (response: any) => {
          this.loaderService.showLoader();
          if (response) {
            this.loaderService.hideLoader();
            // this.router.navigate(['/calendario']).then(() => {
            //   location.reload();
            // });
          } else {
            this.loaderService.hideLoader();
          }
        },
        error: (error) => error,
      });
  }

  deleteEvent(event: any): void {
    this.loaderService.showLoader();
    this.calendarService.deleteEeventCalendar(event?.id).subscribe({
      next: (response: any) => {
        this.loaderService.showLoader();
        if (response) {
          this.loaderService.hideLoader();
          // this.router.navigate(['/calendario']).then(() => {
          //   location.reload();
          // });
        }
      },
    });
    this.changeDetectorRef.detectChanges();
  }
}
