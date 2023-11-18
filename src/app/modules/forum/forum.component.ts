import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PostService } from 'src/app/services/post/post.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { TopicService } from 'src/app/services/topic/topic.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent {
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
    private router: Router,
    private loaderService: LoaderService,
    private postService: PostService,
    private topicService: TopicService,
    private localStorageService: LocalStorageService
  ) {}

  spinnerConsumer: string = 'ForumComponent';
  topics: any[] = [];

  ngOnInit() {
    this.topicService.getAllTopics().subscribe({
      next: (response: any) => {
        this.loaderService.showLoader();
        if (response) {
          this.topics = response;
          this.loaderService.hideLoader();
        } else {
          this.loaderService.hideLoader();
        }
      },
    });
  }

  /*getTopics() {
    this.topicService.getAllTopics().subscribe((data: any) => {
        this.topics = data;
    });
  }*/

  getImageUrl(imgPath: string): string {
    return `./assets/images/${imgPath}`;
  }

  getRedirectUrl(topicId: number): string {
    return `/foro/${topicId}`;
  }

  saveId(id: Number): void {
    this.localStorageService.setKeyValueLocalStorage(
      'idTopic',
      JSON.stringify(id)
    );
  }
}
