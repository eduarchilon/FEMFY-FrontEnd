import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MENU_LOGUEADO, MENU_NO_LOGUEADO } from 'src/app/constans/menu-home';
import { Menu } from 'src/app/models/menu-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrls: ['./header-usuario.component.scss'],
})
export class HeaderUsuarioComponent implements OnInit {
  menuNoLogueado: Menu[] = MENU_NO_LOGUEADO;
  menuLogueado: Menu[] = MENU_LOGUEADO;

  @ViewChild('drawer') drawer!: ElementRef;
  @ViewChild('backdrop') backdrop!: ElementRef;
  @ViewChild('navBar') navBar!: ElementRef;

  ngOnInit(): void {}

  constructor(private router: Router, private authService: AuthService) {}

  get isLogging(): boolean {
    return this.authService.isLoggin;
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
}
