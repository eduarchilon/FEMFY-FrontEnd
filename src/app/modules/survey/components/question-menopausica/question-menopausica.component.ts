import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionMenopausicaService } from 'src/app/services/question-menopausica/question-menopausica.service';

@Component({
  selector: 'app-question-menopausica',
  templateUrl: './question-menopausica.component.html',
  styleUrls: ['./question-menopausica.component.scss'],
})
export class QuestionMenopausicaComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private questionMenopauseService: QuestionMenopausicaService
  ) {}

  ngOnInit(): void {}

  updateQuestionMenopause(value: string, question: string) {
    switch (question) {
      case 'aumentoDePeso':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            aumentoDePeso: value === '1' ? true : false,
            id: this.localStorageService.getUserByLogin()?.idMenopause,
          })
          .subscribe((res: any) => res);
        break;
      case 'changesInLibido':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            changesInLibido: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'changesInMenstrualCycle':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            changesInMenstrualCycle: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'changesInSkinAndHair':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            changesInSkinAndHair: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'lossOfBoneDensity':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            lossOfBoneDensity: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'moodChanges':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            moodChanges: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'sleepingDifficulties':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            sleepingDifficulties: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'suffocation':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            suffocation: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      case 'vaginalDryness':
        this.questionMenopauseService
          .updateUserMenopauseQuestion({
            userId: this.localStorageService.getUserByLogin()?.idUser,
            aumentoDePeso: value === '1' ? true : false,
          })
          .subscribe((res: any) => res);
        break;
      default:
        break;
    }
    console.log(value, question);
  }
}
