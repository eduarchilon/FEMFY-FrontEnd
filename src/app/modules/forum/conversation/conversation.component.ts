import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PostService } from 'src/app/services/post/post.service';
import { ReplayService } from 'src/app/services/replay/replay.service';
import { UserService } from 'src/app/services/user/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-section',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})


export class ConversationComponent {
  replies: any[] = [];

  post!: Post;
  idPost!: number;

  formComment!: FormGroup;
  showFormComment: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private replayService: ReplayService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPost = params.get('id')
      if (idPost !== null) {
        this.idPost = parseInt(idPost)
      }
    });

    this.replayService.getAllRepliesByPost(this.idPost).subscribe((data:any) => {
      this.replies = data;

      this.replies.forEach(reply => {
        this.userService.getUserById(reply.userId).subscribe((data: any) => {
          reply.username = data.userName;
        });
      });
    })

    this.formComment = this.fb.group({
      content: new FormControl('', Validators.required),
    });

    this.getPostById();
    //this.getConversationsByTopic();
  }

  submitFormComment() {
    this.replayService.registerReplay({
      content: this.formComment.value.content,
      createdDate: new Date(),
      userId: this.localStorageService.getUserByLogin()?.idUser,
      postId: this.idPost,
    })
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.router.navigate(['/post/' + this.idPost]).then(() => {
              location.reload();
            });
          }
        },
        error: (error) => error,
      });
  }

  getPostById() {
    this.postService.getPostById(this.idPost).subscribe((data: any) => {
      this.post = data;

      this.userService.getUserById(this.post.userId).subscribe((data: any) => {
        this.post.username = data.userName;
      });
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  openFormComment() {
    this.showFormComment = true;
  }

  closeFormComment() {
    this.showFormComment = false;
  }

}
