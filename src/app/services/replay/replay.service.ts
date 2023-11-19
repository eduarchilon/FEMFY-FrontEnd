import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Replay } from 'src/app/models/replay.model';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {

  apiUrl: string = environment.apiUrlLocal + '/forumReplies';

  constructor(private http: HttpClient) { }

  registerReplay(replay: Replay): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createForumReplay`, replay).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAllRepliesByPost(idPost: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/getForumRepliesByPost/${idPost}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

}