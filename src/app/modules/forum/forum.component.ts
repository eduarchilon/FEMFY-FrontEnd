import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

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
    private loaderService: LoaderService
  ) {}

  spinnerConsumer: string = 'ForumComponent';

  apiUrl: string = 'https://651f0a5044a3a8aa47695bd0.mockapi.io/api/topic';
  topics: any[] = [];

  ngOnInit() {
    this.getTopics().subscribe({
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

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getImageUrl(imgPath: string): string {
    return `./assets/images/${imgPath}`;
  }

  getRedirectUrl(topicId: number): string {
    return `/foro/${topicId}`;
  }
}
