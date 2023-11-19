import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', 
})


export class SubcriptionService {


  usersUrl: string = environment.apiUrlLocal + '/suscripcion';


  constructor(private http: HttpClient) { }

  createSubscription(planData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.usersUrl, planData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    // Aquí puedes manejar errores de la solicitud HTTP
    console.error('Error:', error);
    return throwError('Ocurrió un error al procesar la solicitud.');
  }

}