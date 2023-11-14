import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import {
  Cycle,
  CycleHistorial,
  PredictionCycle,
} from 'src/app/models/cicle.model';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { Store } from '@ngrx/store';
import { selectNumberOfOvulation } from 'src/app/services/redux/selectors/calendar.selector';
import { UserResponse } from 'src/app/models/user.model';
import { selectPredictionCycle } from 'src/app/services/redux/selectors/cycle.selctor';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { cyclesUserSelector } from 'src/app/services/redux/selectors/cycle-user.selector';
import { cycleUserInit } from 'src/app/services/redux/actions/cycle/cycle-user.page.action';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  cycle!: Cycle;
  nextPeriod!: any;
  nextOvulation!: any;

  cycles: CycleHistorial[] = [];
  cyclesWithEndNull: CycleHistorial[] = [];
  cyclesWithOutEndNull: CycleHistorial[] = [];
  //NEW DATA
  averageQuestionCycleContent: number[] = [];
  userAuth!: UserResponse;

  cyclesUser$: Observable<Cycle> = this.store.select(cyclesUserSelector);

  predictionLoad!: PredictionCycle;

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private cicleService: CicleService,
    private router: Router,
    private questionsService: QuestionService,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {
    // this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.userAuth = this.localStorageService.getUserByLogin();
    if (this.userAuth) {
      this.store.dispatch(cycleUserInit());
    }

    this.cyclesUser$.subscribe((dataCycle: any) => {
      if (dataCycle) {
        this.cycles = dataCycle;
        this.cyclesWithEndNull =
          dataCycle?.filter((item: any) => item?.dateEnd === null) || [];
        this.cycle = this.cyclesWithEndNull[0];
        this.cyclesWithOutEndNull =
          dataCycle?.filter((item: any) => item?.dateEnd !== null) || [];
      }
    });

    this.questionsService
      .getAllQuestionUserMenstruation()
      .subscribe((data: any) => {
        if (data) {
          let userQuestions = data?.filter(
            (quest: any) => quest?.userId === this.userAuth?.idUser
          );
          if (userQuestions?.length) {
            let lastCycleDuration = userQuestions[0]?.lastCycleDuration || 28;
            let regularCycleDuration =
              userQuestions[0]?.regularCycleDuration || 28;
            this.averageQuestionCycleContent = [
              lastCycleDuration,
              regularCycleDuration,
            ];
          }
        }
      });

    // this.store.select(selectPredictionCycle).subscribe((pred: any) => {
    //   if (pred) {
    //     this.predictionLoad = pred?.prediction;
    //     if (this.predictionLoad) {
    //       this.nextPeriod = moment(this.predictionLoad.dateNextPeriod)
    //         ?.locale('es')
    //         .format('LL');
    //       this.nextOvulation = moment(this.predictionLoad.period)
    //         ?.add(Math.round(this.predictionLoad?.numberOvulation), 'days')
    //         ?.locale('es')
    //         .format('LL');
    //     }
    //   }
    // });
    //TODO: QUE EL INIT ESTE ACA DEL DISPATCH Y LAS SUBSCRICCPIONES EN LOS COMPONENTES 
  }
}
