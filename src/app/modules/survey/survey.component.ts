import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { emptyQuestionMenopausResponse } from 'src/app/models/question.model';
import { UserResponse } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionMenopausicaService } from 'src/app/services/question-menopausica/question-menopausica.service';

/**
 * @title Basic radios
 */
@Component({
  selector: 'radio-overview-example',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  showSkipButton = false;

  questionType!: number;

  userResponse!: UserResponse;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private questionMenopauseService: QuestionMenopausicaService
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
  }

  selectQuestionByTypeUser(value: string | number): void {
    switch (value) {
      case '1':
        this.questionType = 1;
        this.authService
          .updateUser({ ...this.userResponse, typeUserID: 1 })
          .subscribe({
            next: (res: any) => {
              return res;
            },
            error: (err: any) => err,
          });
        break;
      case '2':
        this.questionType = 2;
        this.authService
          .updateUser({ ...this.userResponse, typeUserID: 2 })
          .subscribe({
            next: (res: any) => {
              return res;
            },
            error: (err: any) => err,
          });
        break;
      case '3':
        this.questionType = 3;
        this.authService
          .updateUser({ ...this.userResponse, typeUserID: 3 })
          .subscribe({
            next: (res: any) => {
              return res;
            },
            error: (err: any) => err,
          });
        break;
      default:
        break;
    }
  }
}
