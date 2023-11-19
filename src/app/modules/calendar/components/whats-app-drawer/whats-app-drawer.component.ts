import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

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
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    console.log(this.data?.item);
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

  setVinculateToFriend(item: EventCalendar): void {
    const newValue: EventCalendar = {
      ...item,
      isFriendWPVinculate: true,
    };
    this.calendarService.editEventCalendar(item?.id, newValue).subscribe({
      next: (res: any) => {
        res;
      },
    });
  }
}
