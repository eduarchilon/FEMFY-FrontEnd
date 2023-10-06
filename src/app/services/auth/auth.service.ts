import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { UserResponse } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { constants } from 'src/app/constans/constants';
import { Store } from '@ngrx/store';
import { setUserLogin } from 'src/app/redux/actions/login.action';
import { AppState } from 'src/app/redux/store/app.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLogging$ = this.isLoggingSubject.asObservable();
  isLoggin: boolean = false;

  //LOGIN
  usersUrl: string = environment.apiUrl + '/usuario';
  _userFinded = new BehaviorSubject<any>(null);
  user!: any; // cambiar a usuario

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  login(userName: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((users: any[]) => {
        const user: UserResponse | any = users.find(
          (user) => user?.userName === userName && user?.password === password
        );
        if (user) {
          this.store.dispatch(setUserLogin({ user: user }));
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER,
            JSON.stringify(user)
          );
          return user;
        }
      })
    );
  }

  loggingUser(): void {
    this.isLoggin = !this.isLoggin;
    this.isLoggingSubject.next(this.isLoggin);
  }
}
