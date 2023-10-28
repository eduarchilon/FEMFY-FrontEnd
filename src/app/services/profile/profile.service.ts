import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Esto asegura que el servicio sea un servicio global
})
export class ProfileService {

  usersUrl: string = environment.apiUrlLocal + '/user';

  constructor(private http: HttpClient) {

  }

  updateUser(fileData: FormData): Observable<any> {
    return this.http.put(`${this.usersUrl}/updateUser`, fileData);
  }


}