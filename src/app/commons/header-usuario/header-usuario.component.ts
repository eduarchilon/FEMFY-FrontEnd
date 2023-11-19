import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  MENU_LOGUEADO,
  MENU_NO_LOGUEADO,
  MENU_PROFILE,
} from 'src/app/constans/menu-home';
import { Menu } from 'src/app/models/menu-model';
import { UserResponse } from 'src/app/models/user.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CYCLE_STATE } from 'src/app/constans/mat-icon.data';
import { MatTooltip } from '@angular/material/tooltip';
import { SharedProfileService } from 'src/app/services/profilePicture/profilePicture.service';
import { userDataInit } from 'src/app/services/redux/actions/user/user-data-page.action';
import { userDataSelector } from 'src/app/services/redux/selectors/user-data.selector';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';

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
    private sharedProfileService: SharedProfileService,
    private loaderService: LoaderService,
    private storage: Storage
  ) {}

  userResponse!: UserResponse;
  userStorage!: UserResponse;
  isLogging: boolean = false;
  isSurveyInit = false;

  userDataResponse$: Observable<UserResponse> =
    this.store.select(userDataSelector);

  icon!: any;

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    if (this.userResponse) {
      this.store.dispatch(userDataInit());
      this.isLogging = true;
      this.getProfilePicture();
      this.store.dispatch(userDataInit());
    } else {
      this.isLogging = false;
    }

    this.userDataResponse$.subscribe((user: any) => {
      if (user?.idUser) {
        this.icon = CYCLE_STATE[`${user?.state}`];
        this.isLogging = true;
        this.getProfilePicture();
      } else {
        this.isLogging = false;
      }
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
    this.loaderService.showLoader();
    this.authService.logoutUser();
    this.router.navigate(['/']).then(() => {
      this.isLogging = false;
      if (this.isLogging === false) {
        this.authService.logoutUser();
        location.reload();
      }
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

  isProfileActive(): boolean {
    // Verifica si la ruta actual está activa
    return (
      this.router.isActive('/perfil', true) ||
      this.router.isActive('/subscription', true) ||
      this.router.isActive('/information', true)
    );
  }

  picture: any[] = [];
  getProfilePicture(): void {
    const idPath = this.localStorageService.getUserByLogin()?.idUser;

    const profilePath = `profile/${idPath}`;
    const fileRef = ref(this.storage, profilePath);

    listAll(fileRef)
      .then(async (picture: any) => {
        this.picture = [];

        for (let pic of picture?.items) {
          const url = await getDownloadURL(pic);

          this.picture.push({ url: url });
        }

        this.sharedProfileService.setUserProfileImage(this.picture[0]?.url);
      })
      .catch((error: any) => {
        error;
      });
  }
}
