import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionCongenitalService } from 'src/app/services/question-congenital/question-congenital.service';

@Component({
  selector: 'app-question-congenital',
  templateUrl: './question-congenital.component.html',
  styleUrls: ['./question-congenital.component.scss'],
})
export class QuestionCongenitalComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private questionCongenitalService: QuestionCongenitalService,
    private router: Router
  ) {}

  idCongenital!: number;
  ngOnInit(): void {
    this.idCongenital = this.localStorageService.parseLocalStorage(
      constants.USER_CONGENITAL
    )?.idCongenital;
  }

  updateQuestionMenopause(value: string, question: string, text?: any): void {
    switch (question) {
      case 'another':
        this.questionCongenitalService
          .updateUserCongenitalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            another: value === '1' ? 1 : 0,
            id: this.idCongenital,
          })
          .subscribe((res: any) => res);
        break;
      case 'anotherDescription':
        this.questionCongenitalService
          .updateUserCongenitalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            anotherDescription: text?.target?.value,
            id: this.idCongenital,
          })
          .subscribe((res: any) => res);
        break;
      case 'malformationsUterine':
        this.questionCongenitalService
          .updateUserCongenitalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            malformationsUterine: value === '1' ? 1 : 0,
            id: this.idCongenital,
          })
          .subscribe((res: any) => res);
        break;
      case 'turnerSyndrome':
        this.questionCongenitalService
          .updateUserCongenitalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            turnerSyndrome: value === '1' ? 1 : 0,
            id: this.idCongenital,
          })
          .subscribe((res: any) => res);
        break;
      default:
        break;
    }
    console.log(question, value, text?.target?.value);
  }

  finishQuestion(): void {
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}
