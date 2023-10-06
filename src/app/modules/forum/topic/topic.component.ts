import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  apiTopic: string = 'https://651f0a5044a3a8aa47695bd0.mockapi.io/api/topic';
  apiUrl: string = 'https://651f0a5044a3a8aa47695bd0.mockapi.io/api/conversation';
  conversations: any[] = [];

  topic!: Topic;
  topicId: string = '';
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.topicId = params.get('id') || '';
    });
  
    this.getTopicById();
    this.getConversationsByTopic();
  }

  getTopicById() {
    this.http.get<Topic>(this.apiTopic + '/' + this.topicId).subscribe(data => {
      this.topic = data
    });
  }

  getConversationsByTopic() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.conversations = data.filter(conversation => conversation.topic === parseInt(this.topicId));
    });
  }
}
