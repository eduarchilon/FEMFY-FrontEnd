import { Component, HostListener } from '@angular/core';
import { TokenSwPush } from './models/token-push.model';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification/notification.service';
import { LoaderService } from './services/loader/loader.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { constants } from './constans/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userId!: number | any;
  respuesta!: TokenSwPush;
  VAPID_PUBLIC_KEY =
    'BCpfOVBWK3YLN5aJ-t5iZkPaPJO5nKIupLV9MSQ6vTArc0cTqOicE3RJAPicSH3hqXlVJFZ8iLlxJJs1STtb4Ik';

  constructor(
    private swPush: SwPush,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.localStorageService.getUserByLogin()?.idUser;
    this.subscribeToNotifications();
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
}
