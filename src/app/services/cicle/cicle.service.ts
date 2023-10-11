import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { Cycle } from 'src/app/models/cicle.model';
import { setCycle } from 'src/app/redux/actions/cycle.action';
import { AppState } from 'src/app/redux/store/app.store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CicleService {
  usersUrl: string = environment.apiUrlLocal + '/cycle';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  registerCycle(cycle: Cycle): Observable<any> {
    return this.http
      .post<any>(`${this.usersUrl}/registerCycleStart`, cycle)
      .pipe(
        map((response) => {
          // this.store.dispatch(setCycle({ cycle: response }));
          return response;
        })
      );
  }

  getCycle(idUser: number | any, dateBeging: Date | any): Observable<any> {
    return this.http
      .get<any[]>(
        `${this.usersUrl}/getCycle/${idUser}?dateBeging=${dateBeging}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllCycles(idUser: number): Observable<any> {
    return this.http
      .get<any[]>(`${this.usersUrl}/getCycleHistory/${idUser}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  editCycle(cicle: Cycle): void {
    console.log(cicle);
  }
}
