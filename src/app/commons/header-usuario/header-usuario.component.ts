import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { constants } from 'src/app/constans/constants';
import {
  MENU_LOGUEADO,
  MENU_NO_LOGUEADO,
  MENU_PROFILE,
} from 'src/app/constans/menu-home';
import { Menu } from 'src/app/models/menu-model';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/services/redux/selectors/login.selector';
import { AppState } from 'src/app/services/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CYCLE_STATE } from 'src/app/constans/mat-icon.data';
import { selectCyclePhaseState } from 'src/app/services/redux/selectors/cycle.selctor';
import { MatTooltip } from '@angular/material/tooltip';
import { SharedProfileService } from 'src/app/services/profilePicture/profilePicture.service';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrls: ['./header-usuario.component.scss'],
})
export class HeaderUsuarioComponent implements OnInit {
  menuNoLogueado: Menu[] = MENU_NO_LOGUEADO;
  menuLogueado: Menu[] = MENU_LOGUEADO;
  menuProfile: Menu[] = MENU_PROFILE;

  @ViewChild('drawer') drawer!: ElementRef;
  @ViewChild('backdrop') backdrop!: ElementRef;
  @ViewChild('navBar') navBar!: ElementRef;
  @ViewChild('myTooltip') myTooltip!: MatTooltip;

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private sharedProfileService: SharedProfileService
  ) {}

  userResponse!: UserResponse;
  userStorage!: UserResponse;
  isLogging: boolean = false;
  isSurveyInit = false;

  icon!: any;

  ngOnInit(): void {
    this.store.select(selectCyclePhaseState).subscribe((data: any) => {
      if (
        data?.cycleState?.statePhase?.fase === 'fertileDay' &&
        data?.cycleState?.statePhase?.id === data?.cycleState?.ovulationNumber
      ) {
        this.icon = CYCLE_STATE?.ovulationDay;
      } else if (data?.cycleState?.statePhase?.fase === 'folicularDay') {
        this.icon = CYCLE_STATE?.folicularDay;
      } else if (data?.cycleState?.statePhase?.fase === 'menstrualDay') {
        this.icon = CYCLE_STATE?.menstrualDay;
      } else if (data?.cycleState?.statePhase?.fase === 'fertileDay') {
        this.icon = CYCLE_STATE?.fertileDay;
      } else if (data?.cycleState?.statePhase?.fase === 'luteaDay') {
        this.icon = CYCLE_STATE?.luteaDay;
      }
    });
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
    // this.userStorage = this.userResponse
    //   ? this.userResponse
    //   : this.localStorageService.getUserByLogin();
    // this.userStorage ? (this.isLogging = true) : (this.isLogging = false);
  }

  handleRouter(path: string): void {
    this.router.navigate([path]);
    this.closeDrawerButton();
  }

  menuToggle(): void {
    let drawer = this.drawer?.nativeElement;
    drawer.classList.remove('-translate-x-full');
    let backdrop = this.backdrop?.nativeElement;
    backdrop?.classList.remove('hidden');
  }

  closeDrawerButton(): void {
    const drawer = this.drawer?.nativeElement;
    drawer?.classList.add('-translate-x-full');
    const backdrop = this.backdrop?.nativeElement;
    backdrop?.classList.add('hidden');
  }

  backdropView(): void {
    const drawer = this.drawer?.nativeElement;
    drawer?.classList.add('-translate-x-full');
    const backdrop = this.backdrop?.nativeElement;
    backdrop?.classList.add('hidden');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth >= 1024) {
      const drawer = this.drawer?.nativeElement;
      drawer?.classList.add('-translate-x-full');
      const backdrop = this.backdrop?.nativeElement;
      backdrop?.classList.add('hidden');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const navBar = this.navBar?.nativeElement;
    if (window.scrollY >= 60 && window.innerWidth >= 1024) {
      navBar?.classList.add('shadow-md');
    } else {
      navBar?.classList.remove('shadow-md');
    }
  }

  logoutUser(): void {
    this.isLogging = false;
    this.authService.logoutUser();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  displayTooltip() {
    this.myTooltip.disabled = false;
    this.myTooltip.show();
    setTimeout(() => {
      this.myTooltip.disabled = true;
    }, 1000);
  }

  getProfileImage(): string {
    return this.sharedProfileService.getUserProfileImage();
  }
}
