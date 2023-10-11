import { Component } from '@angular/core';
import { TokenSwPush } from './models/token-push.model';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification/notification.service';

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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): void {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((res: any) => (this.respuesta = res))
      .catch((err) => (this.respuesta = err));
  }
}
