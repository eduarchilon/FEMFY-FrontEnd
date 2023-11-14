import { Component, OnInit, ViewChild } from '@angular/core';
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
import { constants } from 'src/app/constans/constants';
import { EditCycleComponent } from '../components/edit-cycle/edit-cycle.component';
import { DeleteCycleComponent } from '../components/delete-cycle/delete-cycle.component';
import { FinishCycleComponent } from '../components/finish-cycle/finish-cycle.component';
import { MatTooltip } from '@angular/material/tooltip';
import { UserResponse } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SurveyComponent } from '../../survey/survey.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  fechaActual: Date = new Date();
  fechaFormateada: string = this.formatDate(this.fechaActual);

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  myRegisterQuestion!: QuestionUserMenstruation;

  cycleChart!: Cycle;

  cycles: CycleHistorial[] = [];
  cyclesWithEndNull: CycleHistorial[] = [];
  cyclesWithOutEndNull: CycleHistorial[] = [];

  @ViewChild('editRecomendation') editRecomendation!: MatTooltip;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private questionsService: QuestionService,
    private cicleService: CicleService,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService
  ) { }

  //NEW DATA
  averageQuestionCycleContent: number[] = [28, 28];
  userAuth!: UserResponse;

  ngOnInit(): void {
    //TODO: BORRAR DESPUES
    this.dialog.open(SurveyComponent, {
      panelClass: [
        '!max-w-[95vw]',
        'max-lg:!w-[80%]',
        'max-md:!w-[100vw]',
        'max-xl:!w-[45%]',
        '!w-[45%]',
        '!rounded-[20px]',
      ],
      disableClose: true,
    });
    this.userAuth = this.localStorageService.getUserByLogin();

    this.questionsService
      .getAllQuestionUserMenstruation()
      .subscribe((data: any) => {
        this.loaderService.showLoader();
        if (data) {
          const question = data?.filter(
            (quest: any) => quest?.userId === this.userAuth?.idUser
          );
          let lcd = question[0]?.lastCycleDuration;
          let rcd = question[0]?.regularCycleDuration;
          this.averageQuestionCycleContent = [lcd, rcd]; //TODO
          this.loaderService.hideLoader();
        }
        this.loaderService.hideLoader();
      });

    this.cicleService
      .getAllCycles(this.userAuth?.idUser)
      .subscribe((dataCycle: any) => {
        this.loaderService.showLoader();
        if (dataCycle) {
          this.cyclesWithEndNull = dataCycle?.filter(
            (item: any) => item?.dateEnd === null
          );
          this.cyclesWithOutEndNull = dataCycle?.filter(
            (item: any) => item?.dateEnd !== null
          );
          this.cycles = dataCycle; //TODO
          this.loaderService.hideLoader();
        }
        this.loaderService.hideLoader();
        // this.loaderService.showLoader();
      });
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
