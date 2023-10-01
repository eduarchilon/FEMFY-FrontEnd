import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  login(userName: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((users: any[]) => {
        const user = users.find(
          (user) => user?.userName === userName && user?.password === password
        );
        if (user) {
          //localStorage.setItem('user', JSON.stringify(user)); //guardamos datos en local storage para mantener sesion
          this._userFinded.next(user); //una vez aplicado el local storage esto se borra
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
