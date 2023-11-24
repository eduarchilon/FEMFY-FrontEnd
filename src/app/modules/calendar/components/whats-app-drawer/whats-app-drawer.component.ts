import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataPieChartChildren } from 'src/app/models/data-pie-chart';
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
  //TODO: *Texto en negrita* , ~Texto tachado~, *_Texto en negrita y cursiva_*, Hola,\nEsto es un nuevo párrafo.

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, //fecha,
    private dialogRef: MatDialogRef<WhatsAppDrawerComponent>,
    private calendarService: CalendarService,
    private whatsAppService: WhatsAppService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  vinculateToFriend!: boolean;
  vinculateToMe!: boolean;
  userResponse!: UserResponse;

  ngOnInit(): void {
    console.log(this.data?.itemChart);

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

  closeDialogAll(): void {
    this.dialog.closeAll();
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
    const msgString: string = `¡Hola!
                          \nEl evento de *${
                            this.userResponse?.firstName ||
                            this.userResponse?.userName
                          }* del día ${moment(new Date(item?.date))
      .locale('es')
      .format('LL')} a las ${item?.hour}:
                          \n*${item?.title || 'Sin titulo'}*
                          \n_${item?.description || 'Sin descripción'}_`;
    const phoneNumber: any = this.userResponse?.friendsPhone?.split('+');
    console.log(phoneNumber[1]);
    const msg: WhatsAppMessage = {
      phone: phoneNumber[1],
      message: msgString,
    };
    this.whatsAppService.sendWhatsaAppMessage(msg).subscribe({
      next: (res: any) => {
        if (res) {
          this.openSnackBar('¡Mensaje enviado!', 'X');
        }
      },
    });
  }

  sendToMe(item: EventCalendar): void {
    //DATA EXAMPLE:
    // date: '2023-11-21T03:00:00.000Z';
    // description: 'Tomar pastilla para dolores.';
    // hour: '12:00';
    // id: '1';
    // idUser: 3;
    // isFriendWPVinculate: false;
    // isMyWPVinculate: false;
    // title: 'Paracetamol 500';
    // console.log(moment(new Date(item?.date)).locale('es').format('LL'));
    const msgString: string = `¡Hola!
                          \nTu evento del día ${moment(new Date(item?.date))
                            .locale('es')
                            .format('LL')} a las ${item?.hour}:
                          \n*${item?.title || 'Sin titulo'}*
                          \n_${item?.description || 'Sin descripción'}_`;

    const phoneNumber: any = this.userResponse?.phone?.split('+');
    console.log(phoneNumber[1]);
    const msg: WhatsAppMessage = {
      phone: phoneNumber[1],
      message: msgString,
    };
    this.whatsAppService.sendWhatsaAppMessage(msg).subscribe({
      next: (res: any) => {
        if (res) {
          this.openSnackBar('¡Mensaje enviado!', 'X');
        }
      },
    });
  }

  sendToFriendChart(itemChart: DataPieChartChildren): void {
    // color: 'green';
    // date: '15/11/2023';
    // dayCount: 1;
    // desc: 'Ovulación' || 'Fin del ciclo' || 'Hoy / Ovulación';
    // fase: 'fertileDay';
    // hour: '10:00';
    // id: 15;
    // label: 'Dias Fértiles';
    // width: 100;
    const msgString: string = `¡Hola *${this.userResponse?.friendsName}*! 
    \n${this.userResponse?.firstName || this.userResponse?.userName}, el día ${moment(this.data?.daySelected).locale('es').format('LL')} está en etapa de ${itemChart?.label} ${
      itemChart?.desc !== '' && itemChart?.desc === 'Hoy / Ovulación'
        ? 'y está en ' + itemChart?.desc
        : ''
    }`;
    
    const phoneNumber: any = this.userResponse?.friendsPhone?.split('+');
    console.log(phoneNumber[1]);
    const msg: WhatsAppMessage = {
      phone: phoneNumber[1],
      message: msgString,
    };
    this.whatsAppService.sendWhatsaAppMessage(msg).subscribe({
      next: (res: any) => {
        if (res) {
          this.openSnackBar('¡Mensaje enviado!', 'X');
        }
      },
    });
  }

  sendToMeChart(itemChart: DataPieChartChildren): void {
    const msgString: string = `¡Hola!
                          \nTu ciclo del día ${moment(this.data?.daySelected)
                            .locale('es')
                            .format('LL')}:
                          \nEstás en etapa de ${itemChart?.label} ${
      itemChart?.desc !== '' && itemChart?.desc === 'Hoy / Ovulación'
        ? 'y estas en ' + itemChart?.desc
        : ''
    }`;
    
    const phoneNumber: any = this.userResponse?.phone?.split('+');
    console.log(phoneNumber[1]);
    const msg: WhatsAppMessage = {
      phone: phoneNumber[1],
      message: msgString,
    };
    this.whatsAppService.sendWhatsaAppMessage(msg).subscribe({
      next: (res: any) => {
        if (res) {
          this.openSnackBar('¡Mensaje enviado!', 'X');
        }
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    // location.reload();
  }
}
