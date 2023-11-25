import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { PostService } from 'src/app/services/post/post.service';
import { TopicService } from 'src/app/services/topic/topic.service';
import { RegisterPostComponent } from '../components/register-post/register-post.component';
import { UserService } from 'src/app/services/user/user.service';
import { ReplayService } from 'src/app/services/replay/replay.service';
import { ConversationComponent } from '../conversation/conversation.component';
import { Router } from '@angular/router';
import { AppState } from 'src/app/services/redux/store/app.store';
import { Store } from '@ngrx/store';
import { postInit } from 'src/app/services/redux/actions/post/post.page.action';
import { postSelector } from 'src/app/services/redux/selectors/post.selector';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  posts: any[] = [];

  topic!: Topic;
  idTopic!: number;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private topicService: TopicService,
    private replayService: ReplayService,
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private loaderServices: LoaderService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(postInit());
    this.store.select(postSelector).subscribe((data: any) => {
      this.getConversationsByTopic();
    });

    this.route.paramMap.subscribe((params) => {
      const idTopic = params.get('id');
      if (idTopic !== null) {
        this.idTopic = parseInt(idTopic);
        this.store.dispatch(postInit());
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
      this.posts.forEach((post) => {
        this.userService.getUserById(post.userId).subscribe((data: any) => {
          post.username = data.userName;
        });
      });
    });
  }

  openPostRegister(): void {
    const dialogRef = this.dialog.open(RegisterPostComponent, {
      panelClass: [
        '!max-w-[95vw]',
        'max-lg:!w-[80%]',
        'max-md:!w-[100vw]',
        'max-xl:!w-[50%]',
        '!w-[50%]',
        '!rounded-[20px]',
      ],
      data: { idTopic: this.idTopic },
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  cutText(valuText: string): string {
    return valuText?.length > 20 ? valuText.slice(0, 22) + '...' : valuText;
  }

  formatText(value: string): string {
    const palabras = value.split(/<\/?p>/);
    const text = palabras.join(' ');
    return text.length > 130 ? text.slice(0, 130) + '...' : text;
  }

  allowReload = false;

  // Maneja el evento beforeunload
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.allowReload) {
      this.router.navigate(['/']);
    }
  }
}
