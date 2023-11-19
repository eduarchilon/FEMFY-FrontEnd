import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { EventCalendar } from 'src/app/models/event-calendar.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  usersUrl: string = environment.apiUrl + '/calendar';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getEventsCalendar(idUser: number | any): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }

  setEvent(event: EventCalendar): Observable<any> {
    return this.http.post<any>(this.usersUrl, event).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteEeventCalendar(idEvent: string): Observable<any> {
    return this.http.delete<any>(`${this.usersUrl}/${idEvent}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  editEventCalendar(idEvent: string, event: EventCalendar): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/${idEvent}`, event);
  }
}
