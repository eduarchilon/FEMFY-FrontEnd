import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, switchMap } from 'rxjs';
import { UserRequest, UserResponse } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { constants } from 'src/app/constans/constants';
import { Store } from '@ngrx/store';
import { setUserLogin } from 'src/app/redux/actions/login.action';
import { AppState } from 'src/app/redux/store/app.store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLogging$ = this.isLoggingSubject.asObservable();
  isLoggin: boolean = false;

  //LOGIN
  // usersUrl: string = environment.apiUrl + '/usuario';
  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer ' + tuTokenDeAutenticacion
  // });
  usersUrl: string = environment.apiUrlLocal + '/user';
  _userFinded = new BehaviorSubject<any>(null);
  user!: any; // cambiar a usuario

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersUrl}/getUsers`);
  }

  getUserId(): string {
    return sessionStorage['userId'];
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

  register(userRequest: UserRequest): Observable<any> {
    return this.getUsers().pipe(
      map((data: any) => {
        const existingUser = data.find((user: UserResponse) => {
          return (
            user?.userName === userRequest?.userName ||
            user?.email === userRequest?.email
          );
        });

        if (existingUser) {
          if (existingUser.userName === userRequest.userName) {
            return existingUser.userName; // Usuario con el mismo nombre de usuario
          }

          if (existingUser.email === userRequest.email) {
            return existingUser.email; // Usuario con el mismo correo electrónico
          }
        } else {
          // El usuario no existe, realizar el registro
          return this.http
            .post<UserRequest>(`${this.usersUrl}/createUser`, {
              typeUserID: 1,
              ...userRequest,
            })
            .pipe(map((response: any) => response));
        }
      })
    );
  }

  loggingUser(): void {
    this.isLoggin = !this.isLoggin;
    this.isLoggingSubject.next(this.isLoggin);
  }

  logoutUser(): void {
    this.localStorageService.deleteValue(constants.USER);
    this.store.dispatch(setUserLogin({ user: null }));
  }

  // testLocalHostServer(): void {
  //   this.http
  //     .get<any[]>('http://localhost:8090/api/v1/user/getUsers')
  //     .subscribe((data) => console.log('Funcionando', data));
  // }
}
