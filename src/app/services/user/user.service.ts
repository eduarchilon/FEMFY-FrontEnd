import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HistorialService } from '../historial/historial.service';
import { QuestionService } from '../question/question.service';
import { QuestionMenopausicaService } from '../question-menopausica/question-menopausica.service';
import { UserDataCycle, UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import {
  emptyQuestionCongenitalResponse,
  emptyQuestionHormonalResponse,
  emptyQuestionMenopauseResponse,
} from 'src/app/models/question.model';
import { constants } from 'src/app/constans/constants';
import { emptyQuestionHistoryResponse } from 'src/app/models/historial.model';
import { QuestionCongenitalService } from '../question-congenital/question-congenital.service';
import { QuestionHormonalService } from '../question-hormonal/question-hormonal.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrlLocal + '/user';

  constructor(
    private http: HttpClient,
    private historialService: HistorialService,
    private questionMenstruationService: QuestionService,
    private questionMenopausicaService: QuestionMenopausicaService,
    private questionCongenitalService: QuestionCongenitalService,
    private questionHormonalService: QuestionHormonalService,
    private localStorageService: LocalStorageService
  ) {}

  getUserById(idUser: number | any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${idUser}`);
  }

  setUserDataCycleInformation(user: UserResponse): void {
    if (user?.idUser) {
      //HISTORIAL
      this.historialService
        .createQuestion({
          ...emptyQuestionHistoryResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER_HISTORIAL,
            JSON.stringify({
              idHistorial: response?.id,
            })
          );
          return response;
        });

      //MENSTRUANTE
      this.questionMenstruationService
        .createUserMenstruationQuestion({
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER_MENSTRUATION,
            JSON.stringify({
              idMenstruation: response?.id,
            })
          );
          return response;
        });

      //MENOPAUSICO
      this.questionMenopausicaService
        .createUserMenopauseQuestion({
          ...emptyQuestionMenopauseResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER_MENOPAUSE,
            JSON.stringify({
              idMenopause: response?.id,
            })
          );
          return response;
        });

      //CONGENITAL
      this.questionCongenitalService
        .createUserCongenitalQuestion({
          ...emptyQuestionCongenitalResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER_CONGENITAL,
            JSON.stringify({
              idCongenital: response?.id,
            })
          );
          return response;
        });

      //HORMONAL
      this.questionHormonalService
        .createUserHormonalQuestion({
          ...emptyQuestionHormonalResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USER_HORMONAL,
            JSON.stringify({
              idHormonal: response?.id,
            })
          );
          return response;
        });
    }
  }
}
