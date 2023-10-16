import { Component } from '@angular/core';
import { TokenSwPush } from './models/token-push.model';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification/notification.service';
import { LoaderService } from './services/loader/loader.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { constants } from './constans/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  respuesta!: TokenSwPush;
  VAPID_PUBLIC_KEY =
    'BCpfOVBWK3YLN5aJ-t5iZkPaPJO5nKIupLV9MSQ6vTArc0cTqOicE3RJAPicSH3hqXlVJFZ8iLlxJJs1STtb4Ik';

  constructor(
    private swPush: SwPush,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.subscribeToNotifications();
    setInterval(() => {
      const ahora = new Date();
      const horaActual = ahora.getHours();
      const minutosActuales = ahora.getMinutes();
      if (horaActual === 18 && minutosActuales === 24) {
        this.mostrarMensaje();
      }
    }, 5000);
  }

  subscribeToNotifications(): void {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((res: any) => {
        this.respuesta = res;
        this.localStorageService.deleteValue(constants.NOTIFICATION_KEY);
        this.localStorageService.setKeyValueLocalStorage(
          constants.NOTIFICATION_KEY,
          JSON.stringify(this.respuesta)
        );
      })
      .catch((err) => err);
  }

  mostrarMensaje() {
    console.log('¡Hola Mundo!');
  }
}
