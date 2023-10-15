import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import {
  notificationKey,
  notificationPayloadContent,
} from 'src/app/models/notification.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { constants } from 'src/app/constans/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public enviarNotificacion(title: string, body: string): Observable<any> {
    if (this.localStorageService.getLocalStorage(constants.NOTIFICATION_KEY)) {
      return this.http
        .post(
          `https://notification-server-alpha.vercel.app/api/enviar-notificacion`,
          {
            data: {
              data: notificationKey(),
              payload: notificationPayloadContent(title, body),
            },
          }
        )
        .pipe(
          map((response) => {
            return response;
          })
        );
    } else {
      return of(['']);
    }
  }
}
