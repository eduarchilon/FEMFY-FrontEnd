import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/**
 * @title Basic radios
 */
@Component({
  selector: 'radio-overview-example',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.scss'],
})
export class SurveyComponent {
  showSkipButton = false;

  questionType!: number;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  selectQuestionByTypeUser(value: string | number): void {
    switch (value) {
      case '1':
        this.questionType = 1;
        console.log(this.questionType);
        break;
      case '2':
        this.questionType = 2;
        console.log(this.questionType);
        break;
      case '3':
        this.questionType = 3;
        console.log(this.questionType);
        break;
      default:
        break;
    }
  }
}
