import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataPieChartChildren } from 'src/app/models/data-pie-chart';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-pie-notification',
  templateUrl: './pie-notification.component.html',
  styleUrls: ['./pie-notification.component.scss'],
})
export class PieNotificationComponent implements OnChanges, OnInit {
  @Input() events: DataPieChartChildren[] = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const user: UserResponse = this.localStorageService.getUserByLogin();
    this.events?.forEach((event: DataPieChartChildren | any) => {
      setInterval(() => {
        //La fecha de hoy y las horas
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();

        //Obtengo la hora y minutos
        const time: any = user?.emotion?.split(':');
        let hour = 0;
        let minutes = 0;
        if (event?.hour && time.length === 2) {
          hour = parseInt(time[0], 10);
          minutes = parseInt(time[1], 10);
        }

        const eventDay = moment(event?.hour);

        if (
          moment(ahora).isSame(eventDay, 'day') &&
          horaActual === hour &&
          minutosActuales === minutes
        ) {
          console.log(
            `¡Hola ${user?.firstName || user?.userName}!`,
            `Hoy es tu etapa de:  ${event?.label}`
          );

          this.sendNotification(
            `¡Hola ${user?.firstName || user?.userName}!`,
            `Hoy es tu etapa de:  ${event?.label}`
          );
        }
      }, 30000);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const user = this.localStorageService.getUserByLogin();
    this.events?.forEach((event: DataPieChartChildren | any) => {
      setInterval(() => {
        //La fecha de hoy y las horas
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();

        //Obtengo la hora y minutos
        const time: any = user?.emotion?.split(':');
        let hour = 0;
        let minutes = 0;
        if (event?.hour && time.length === 2) {
          hour = parseInt(time[0], 10);
          minutes = parseInt(time[1], 10);
        }

        const dateArray = event?.date?.split('/');

        const newDate = new Date(
          Number(dateArray[2]),
          Number(dateArray[1]) - 1,
          Number(dateArray[0])
        );

        const eventDay = moment(newDate);

        if (
          moment(ahora).isSame(eventDay, 'day') &&
          horaActual === hour &&
          minutosActuales === minutes
        ) {
          console.log(
            `¡Hola ${user?.firstName || user?.userName}!`,
            `Hoy es tu etapa de:  ${event?.label}`
          );

          this.sendNotification(
            `¡Hola ${user?.firstName || user?.userName}!`,
            `Hoy es tu etapa de:  ${event?.label}`
          );
        }
      }, 30000);
    });
  }

  sendNotification(title: string, description: string): void {
    this.notificationService.enviarNotificacion(title, description).subscribe({
      next: (res: any) => res,
    });
  }
}
