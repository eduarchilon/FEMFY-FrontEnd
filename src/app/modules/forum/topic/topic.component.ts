import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { PostService } from 'src/app/services/post/post.service';
import { TopicService } from 'src/app/services/topic/topic.service';
import { RegisterPostComponent } from '../components/register-post/register-post.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  posts: any[] = [];

  topic!: Topic;
  idTopic!: number;

  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private topicService: TopicService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idTopic = params.get('id')
      if (idTopic !== null) {
        this.idTopic = parseInt(idTopic)
      }
    });

    this.getTopicById();
    this.getConversationsByTopic();
  }

  getRedirectToPost(postId: number): string {
    return `/post/${postId}`;
  }

  getTopicById() {
    this.topicService.getTopicById(this.idTopic).subscribe((data: any) => {
      this.topic = data;
    });
  }

  getConversationsByTopic() {
    this.postService.getAllPostsByTopic(this.idTopic).subscribe((data: any) => {
      this.posts = data;
      console.log(data)
    });
  }

  openPostRegister(): void {
    const dialogRef = this.dialog.open(RegisterPostComponent, {
      panelClass: ['!rounded-[20px]'],
      data: { idTopic: this.idTopic }
    });
  }
}
