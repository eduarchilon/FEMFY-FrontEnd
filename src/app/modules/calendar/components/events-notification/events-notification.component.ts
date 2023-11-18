import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-events-notification',
  templateUrl: './events-notification.component.html',
  styleUrls: ['./events-notification.component.scss'],
})
export class EventsNotificationComponent implements OnInit, OnChanges {
  @Input() events: EventCalendar[] = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.events);
    this.events.forEach((event: EventCalendar | any) => {
      setInterval(() => {
        //La fecha de hoy y las horas
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();

        //Obtengo la hora y minutos
        const time = event?.hour?.split(':');
        let hour = 0;
        let minutes = 0;
        if (event?.hour && time.length === 2) {
          hour = parseInt(time[0], 10);
          minutes = parseInt(time[1], 10);
        }

        const eventDay = moment(event?.date);

        if (
          moment(ahora).isSame(eventDay, 'day') &&
          horaActual === hour &&
          minutosActuales === minutes
        ) {
          console.log(event?.title, event?.description);

          this.sendNotification(event?.title, event?.description);
        }
      }, 30000);
    });
  }

  ngOnInit(): void {
    console.log(this.events);

    this.events.forEach((event: EventCalendar | any) => {
      setInterval(() => {
        //La fecha de hoy y las horas
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();

        //Obtengo la hora y minutos
        const time = event?.hour?.split(':');
        let hour = 0;
        let minutes = 0;
        if (event?.hour && time.length === 2) {
          hour = parseInt(time[0], 10);
          minutes = parseInt(time[1], 10);
        }

        const eventDay = moment(event?.date);

        if (
          moment(ahora).isSame(eventDay, 'day') &&
          horaActual === hour &&
          minutosActuales === minutes
        ) {
          this.sendNotification(event?.title, event?.description);
        }
      }, 60000);
    });
  }

  sendNotification(title: string, description: string): void {
    this.notificationService.enviarNotificacion(title, description).subscribe({
      next: (res: any) => res,
    });
  }
}
