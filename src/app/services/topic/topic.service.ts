import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  apiUrl: string = environment.apiUrlLocal + '/forumTopics';

  constructor(private http: HttpClient) { }

  getTopicById(idTopic: number | any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${idTopic}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAllTopics(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllForumTopics`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  
}
