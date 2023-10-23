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
  respuesta!: TokenSwPush;
  VAPID_PUBLIC_KEY =
    'BCpfOVBWK3YLN5aJ-t5iZkPaPJO5nKIupLV9MSQ6vTArc0cTqOicE3RJAPicSH3hqXlVJFZ8iLlxJJs1STtb4Ik';

  constructor(
    private swPush: SwPush,
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
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

  lastScrollTop = 0;
  scrolledUp: boolean = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      this.scrolledUp = false;
    } else {
      this.scrolledUp = true;
    }
    this.lastScrollTop = st;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const currentPosition = st + windowHeight;
    if (currentPosition >= documentHeight) {
      this.scrolledUp = true;
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
