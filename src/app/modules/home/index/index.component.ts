import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterCicleComponent } from '../components/register-cicle/register-cicle.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { Cycle, CycleHistorial } from 'src/app/models/cicle.model';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditCycleComponent } from '../components/edit-cycle/edit-cycle.component';
import { DeleteCycleComponent } from '../components/delete-cycle/delete-cycle.component';
import { FinishCycleComponent } from '../components/finish-cycle/finish-cycle.component';
import { MatTooltip } from '@angular/material/tooltip';
import { UserResponse } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/services/redux/store/app.store';
import { cycleUserInit } from 'src/app/services/redux/actions/cycle/cycle-user.page.action';
import { cyclesUserSelector } from 'src/app/services/redux/selectors/cycle-user.selector';
import { questionUserMenstruationInit } from 'src/app/services/redux/actions/question-menstruation/question-menstruation-user-page.action';
import { questionUserMenstruationSelector } from 'src/app/services/redux/selectors/question-menstruation.selector';
import { SurveyComponent } from '../../survey/survey.component';
import { WhatsAppService } from 'src/app/services/whats-app/whats-app.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  fechaActual: Date = new Date();
  fechaFormateada: string = this.formatDate(this.fechaActual);

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  myRegisterQuestion!: QuestionUserMenstruation;

  cycles: CycleHistorial[] = [];
  cyclesWithEndNull: CycleHistorial[] = [];
  cyclesWithOutEndNull: CycleHistorial[] = [];

  @ViewChild('editRecomendation') editRecomendation!: MatTooltip;

  private cyclesUserSubscription: Subscription | null = null;
  private userMenstruationSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
    private store: Store<AppState>,
    private whatsAppService: WhatsAppService
  ) {}

  ngOnDestroy(): void {
    this.cyclesUserSubscription?.unsubscribe();
    this.userMenstruationSubscription?.unsubscribe();
  }

  //NEW DATA
  averageQuestionCycleContent: number[] = [];
  userAuth!: UserResponse;

  cyclesUser$: Observable<Cycle> = this.store.select(cyclesUserSelector);
  questionUserMenstruation$: Observable<QuestionUserMenstruation> =
    this.store.select(questionUserMenstruationSelector);

  ngOnInit(): void {
    this.userAuth = this.localStorageService.getUserByLogin();
    if (this.userAuth) {
      this.store?.dispatch(cycleUserInit());
      this.store.dispatch(questionUserMenstruationInit());
      if (this.whatsAppService.getWhatsAppApiNotification()) {
      }
    }

    this.userMenstruationSubscription =
      this.questionUserMenstruation$.subscribe(async (question: any) => {
        if (question.length > 0) {
          let lcd = await question[0]?.lastCycleDuration;
          let rcd = await question[0]?.regularCycleDuration;
          if (lcd) {
            this.averageQuestionCycleContent.push(lcd);
          } else {
            this.averageQuestionCycleContent.push(35);
          }

          if (rcd) {
            this.averageQuestionCycleContent.push(rcd);
          } else {
            this.averageQuestionCycleContent.push(35);
          }
        }
      });

    this.cyclesUserSubscription = this.cyclesUser$.subscribe(
      async (dataCycle: any) => {
        if (dataCycle) {
          this.cyclesWithEndNull = await dataCycle?.filter(
            (item: any) => item?.dateEnd === null
          );
          this.cycles = dataCycle;
        }
      }
    );
  }

  openCicleRegister(cycle: Cycle | any): void {
    const dialogRef = this.dialog.open(RegisterCicleComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
      data: {
        ...cycle,
      },
    });
  }

  setCycle(dateBeging: Date | any, bleedingDuration: number | any): string {
    return '28';
  }

  finishActualCicle(cycleChart: Cycle): void {
    const dialogRef = this.dialog.open(FinishCycleComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
      data: {
        cycleChart,
      },
    });
  }

  editActualCycle(cycleChart: Cycle): void {
    const dialogRef = this.dialog.open(EditCycleComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
      data: {
        cycleChart,
      },
    });
  }

  deleteActualCycle(cycleChart: Cycle): void {
    const dialogRef = this.dialog.open(DeleteCycleComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
      data: {
        cycleChart,
      },
    });
  }

  displayTooltip() {
    this.editRecomendation.disabled = false;
    this.editRecomendation.show();
    setTimeout(() => {
      this.editRecomendation.disabled = true;
    }, 1000);
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} de ${month}`;
  }
}
