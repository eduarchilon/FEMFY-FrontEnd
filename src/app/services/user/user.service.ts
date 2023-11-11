import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HistorialService } from '../historial/historial.service';
import { QuestionService } from '../question/question.service';
import { QuestionMenopausicaService } from '../question-menopausica/question-menopausica.service';
import { QuestionOtherService } from '../question-other/question-other.service';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { emptyQuestionMenopauseResponse } from 'src/app/models/question.model';
import { constants } from 'src/app/constans/constants';
import { emptyQuestionHistoryResponse } from 'src/app/models/historial.model';

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
    private questionOther: QuestionOtherService,
    private localStorageService: LocalStorageService
  ) {}

  getUserById(idUser: number | any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${idUser}`).pipe(
      map((response) => {
        return response;
      })
    );
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
            constants.USERCYCLE,
            JSON.stringify({
              userId: this.localStorageService.getUserByLogin()?.idUser,
              idHistorial: response.id,
            })
          );
        });

      //MENSTRUANTE
      this.questionMenstruationService
        .createUserMenstruationQuestion({
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USERCYCLE,
            JSON.stringify({
              ...this.localStorageService.getUserDataCycle(),
              idMenstruation: response.id,
            })
          );
        });

      //MENOPAUSICO
      this.questionMenopausicaService
        .createUserMenopauseQuestion({
          ...emptyQuestionMenopauseResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          this.localStorageService.setKeyValueLocalStorage(
            constants.USERCYCLE,
            JSON.stringify({
              ...this.localStorageService.getUserDataCycle(),
              idMenopause: response.id,
            })
          );
        });
    }
  }
}
