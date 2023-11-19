import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { UserResponse } from 'src/app/models/user.model';
import { WhatsAppMessage } from 'src/app/models/whats-app-message.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { WhatsAppService } from 'src/app/services/whats-app/whats-app.service';

@Component({
  selector: 'app-whats-app-drawer',
  templateUrl: './whats-app-drawer.component.html',
  styleUrls: ['./whats-app-drawer.component.scss'],
})
export class WhatsAppDrawerComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, //fecha,
    private dialogRef: MatDialogRef<WhatsAppDrawerComponent>,
    private calendarService: CalendarService,
    private whatsAppService: WhatsAppService,
    private _snackBar: MatSnackBar,
    private localStorageService: LocalStorageService
  ) {}

  vinculateToFriend!: boolean;
  vinculateToMe!: boolean;
  userResponse!: UserResponse;

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.vinculateToFriend = this.data?.item?.isFriendWPVinculate;
    this.vinculateToMe = this.data?.item?.isMyWPVinculate;
    // setInterval(() => {
    //   //La fecha de hoy y las horas
    //   const ahora = new Date();
    //   const horaActual = ahora.getHours();
    //   const minutosActuales = ahora.getMinutes();

    //   const eventDay = moment();

    //   if (moment(ahora).isSame(eventDay, 'day')) {
    //     // console.log('enviado');
    //   }
    // }, 1000);
  }

  setVinculateToFriend(event: any, item: EventCalendar): void {
    const value = event.checked;
    const newValue: EventCalendar = {
      ...item,
      isFriendWPVinculate: value,
    };
    this.calendarService.editEventCalendar(item?.id, newValue).subscribe({
      next: (res: any) => {
        res;
      },
    });
  }

  setVinculateToMe(event: any, item: EventCalendar): void {
    const value = event.checked;
    const newValue: EventCalendar = {
      ...item,
      isMyWPVinculate: value,
    };
    this.calendarService.editEventCalendar(item?.id, newValue).subscribe({
      next: (res: any) => {
        res;
      },
    });
  }

  sendToFriend(item: EventCalendar): void {
    const msg: WhatsAppMessage = {
      phone: '5491168087762',
      message: `${item?.description}`,
    };
    this.whatsAppService.sendWhatsaAppMessage(msg).subscribe({
      next: (res: any) => {
        if (res) {
          this.openSnackBar('¡Mensaje enviado!', 'Ok');
        }
      },
    });
  }

  sendToMe(item: EventCalendar): void {
    const msg: WhatsAppMessage = {
      phone: '5491168087762',
      message: `${item?.description}`,
    };
    this.whatsAppService.sendWhatsaAppMessage(msg).subscribe({
      next: (res: any) => {
        if (res) {
          this.openSnackBar('¡Mensaje enviado!', 'Ok');
        }
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
