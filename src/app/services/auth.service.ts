import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isLogging$ = this.isLoggingSubject.asObservable();

  isLoggin: boolean = false;

  constructor() {}

  loggingUser(): void {
    this.isLoggin = !this.isLoggin;
    this.isLoggingSubject.next(this.isLoggin);
  }
}
