import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  MAT_MOBILE_LOGUEADO,
  MAT_MOBILE_NO_LOGGUEADO,
} from 'src/app/constans/menu-home';
import { Menu } from 'src/app/models/menu-model';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/services/redux/selectors/login.selector';
import { AppState } from 'src/app/services/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  lastScrollTop = 0;
  scrolledUp: boolean = true;

  menuNoLogueado: Menu[] = MAT_MOBILE_NO_LOGGUEADO;
  menuLogueado: Menu[] = MAT_MOBILE_LOGUEADO;
  userResponse!: UserResponse;
  isLogging: boolean = false;

  isSurveyInit = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
      this.userResponse ? (this.isLogging = true) : (this.isLogging = false);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/cuestionario') {
          this.isSurveyInit = true;
        } else {
          this.isSurveyInit = false;
        }
      }
    });
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: Event): void {
  //   const st = window.pageYOffset || document.documentElement.scrollTop;
  //   if (st > this.lastScrollTop) {
  //     this.scrolledUp = false;
  //   } else {
  //     this.scrolledUp = true;
  //   }
  //   this.lastScrollTop = st;
  //   const documentHeight = document.documentElement.scrollHeight;
  //   const windowHeight = window.innerHeight;
  //   const currentPosition = st + windowHeight;
  //   if (currentPosition >= documentHeight) {
  //     this.scrolledUp = true;
  //   }
  // }

  isActiveRoute(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
