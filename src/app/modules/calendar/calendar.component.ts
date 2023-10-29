import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { Cycle, CycleHistorial } from 'src/app/models/cicle.model';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { Store } from '@ngrx/store';
import { selectNumberOfOvulation } from 'src/app/services/redux/selectors/calendar.selector';
import { UserResponse } from 'src/app/models/user.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  cycle!: Cycle;
  nextPeriod: number = 0;
  nextOvulation: number = 0;

  cycles: CycleHistorial[] = [];
  cyclesWithEndNull: CycleHistorial[] = [];
  cyclesWithOutEndNull: CycleHistorial[] = [];
  //NEW DATA
  averageQuestionCycleContent: number[] = [];
  userAuth!: UserResponse;

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private cicleService: CicleService,
    private router: Router,
    private questionsService: QuestionService,
    private store: Store<AppState>
  ) {
    // this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.userAuth = this.localStorageService.getUserByLogin();

    this.questionsService
      .getAllQuestionUserMenstruation()
      .subscribe((data: any) => {
        const question = data?.filter(
          (quest: any) => quest?.userId === this.userAuth?.idUser
        );
        const lcd = question[0]?.lastCycleDuration || 28;
        const rcd = question[0]?.regularCycleDuration || 28;
        this.averageQuestionCycleContent = [lcd, rcd]; //TODO
      });

    this.cicleService
      .getAllCycles(this.userAuth?.idUser)
      .subscribe((dataCycle: any) => {
        if (dataCycle) {
          this.cyclesWithEndNull = dataCycle?.filter(
            (item: any) => item?.dateEnd === null
          );
          this.cycle = dataCycle?.filter(
            (item: any) => item?.dateEnd === null
          )[0];
          this.cyclesWithOutEndNull = dataCycle?.filter(
            (item: any) => item?.dateEnd !== null
          );
          this.cycles = dataCycle; //TODO
        }
        // this.loaderService.showLoader();
      });
  }
}
