import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl: string = environment.apiUrlLocal + '/forumPosts';

  constructor(private http: HttpClient) {}

  getPostById(idPost: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${idPost}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  registerPost(post: Post): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createForumPost`, post).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAllPostsByTopic(idTopic: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiUrl}/getForumPostsByTopic/${idTopic}`
    );
  }
}
