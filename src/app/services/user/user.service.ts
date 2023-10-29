import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = environment.apiUrlLocal + '/user';

  constructor(private http: HttpClient) { }

  getUserById(idUser: number | any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${idUser}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  
}
