import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionHormonalService } from 'src/app/services/question-hormonal/question-hormonal.service';

@Component({
  selector: 'app-question-hormonal',
  templateUrl: './question-hormonal.component.html',
  styleUrls: ['./question-hormonal.component.scss'],
})
export class QuestionHormonalComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private questionHormonalService: QuestionHormonalService,
    private router: Router
  ) {}

  idHormonal!: number;
  ngOnInit(): void {
    this.idHormonal = this.localStorageService.parseLocalStorage(
      constants.USER_HORMONAL
    )?.idHormonal;
  }

  finishQuestion(): void {
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  updateQuestionHormonal(value: string, question: string, text?: any): void {
    switch (question) {
      case 'another':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            another: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'anotherDescription':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            anotherDescription: text,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'hyperprolactinemia':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            hyperprolactinemia: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'hypothalamicDisorders':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            hypothalamicDisorders: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'hypothyroidism':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            hypothyroidism: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'insulinResistance':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            insulinResistance: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'polycysticOvarySyndrome':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            polycysticOvarySyndrome: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'prematureOvarianFailure':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            prematureOvarianFailure: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      case 'sheehanSyndrome':
        this.questionHormonalService
          .updateUserHormonalQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            sheehanSyndrome: value === '1' ? 1 : 0,
            id: this.idHormonal,
          })
          .subscribe((res: any) => res);
        break;
      default:
        break;
    }
    console.log(question, value, text);
  }
}
