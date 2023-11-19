import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserRequest, UserResponse } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { constants } from 'src/app/constans/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/services/redux/store/app.store';
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
              typeUserID: 3,
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
    this.localStorageService.deleteValue(constants.USER_CONGENITAL);
    this.localStorageService.deleteValue(constants.USER_HISTORIAL);
    this.localStorageService.deleteValue(constants.USER_HORMONAL);
    this.localStorageService.deleteValue(constants.USER_MENOPAUSE);
    this.localStorageService.deleteValue(constants.USER_MENSTRUATION);
  }

  updateUser(user: UserResponse): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/updateUser`, user).pipe(
      map((userResponse: any) => {
        if (userResponse) {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER,
            JSON.stringify({
              ...userResponse,
            })
          );
          return userResponse;
        }
        return userResponse;
      })
    );
  }
}
