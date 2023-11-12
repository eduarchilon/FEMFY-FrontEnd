import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HistorialService } from '../historial/historial.service';
import { QuestionService } from '../question/question.service';
import { QuestionMenopausicaService } from '../question-menopausica/question-menopausica.service';
import { UserResponse } from 'src/app/models/user.model';
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
    console.log(idUser);
    
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
          return response;
        });

      //MENSTRUANTE
      this.questionMenstruationService
        .createUserMenstruationQuestion({
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          return response;
        });

      //MENOPAUSICO
      this.questionMenopausicaService
        .createUserMenopauseQuestion({
          ...emptyQuestionMenopauseResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          return response;
        });

      //CONGENITAL
      this.questionCongenitalService
        .createUserCongenitalQuestion({
          ...emptyQuestionCongenitalResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          return response;
        });

      //HORMONAL
      this.questionHormonalService
        .createUserHormonalQuestion({
          ...emptyQuestionHormonalResponse(),
          userId: user.idUser,
        })
        .subscribe((response: any) => {
          return response;
        });
    }
  }
}
