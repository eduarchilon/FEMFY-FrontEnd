import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { constants } from 'src/app/constans/constants';
import {
  MENU_LOGUEADO,
  MENU_NO_LOGUEADO,
  MENU_PROFILE,
} from 'src/app/constans/menu-home';
import { Menu } from 'src/app/models/menu-model';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  userResponse!: UserResponse;
  userStorage!: UserResponse;
  isLogging: boolean = false;

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
      this.userResponse ? (this.isLogging = true) : (this.isLogging = false);
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

  filterMenuDesktop(menu: Menu[]): Menu[] {
    return menu.filter((item) => item.path !== '');
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
      navBar?.classList.add('border-b-2', 'border-solid', 'border-white');
    } else {
      navBar?.classList.remove('border-b-2', 'border-solid', 'border-white');
    }
  }

  logoutUser(): void {
    this.isLogging = false;
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
