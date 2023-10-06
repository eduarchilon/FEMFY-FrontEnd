import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
//import { FOOTER } from 'src/app/constans/menu-home';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-footer-usuario',
  templateUrl: './footer-usuario.component.html',
  styleUrls: ['./footer-usuario.component.scss'],
})
export class FooterUsuarioComponent implements OnInit {
  ngOnInit(): void {}
  @ViewChild('footer') footer!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {}
}
