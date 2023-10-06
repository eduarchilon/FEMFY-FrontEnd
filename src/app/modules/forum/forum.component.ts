import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {
  constructor(private http: HttpClient) { }

  apiUrl: string = 'https://651f0a5044a3a8aa47695bd0.mockapi.io/api/topic';
  topics: any[] = [];

  ngOnInit() {
    this.getTopics().subscribe(data => {
      this.topics = data;
    });
  }

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getImageUrl(imgPath: string): string {
    return `./assets/images/${imgPath}`;
  }

  getRedirectUrl(topicId: number): string {
    return `/foro/${topicId}`;
  }

}
