import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardian implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getUserByLogin() !== null) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
