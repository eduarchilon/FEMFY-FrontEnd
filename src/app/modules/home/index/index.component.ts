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
  initRegisterId: number = this.localStorageService.getLocalStorage(
    constants.ID_REGISTER
  );

  @ViewChild('editRecomendation') editRecomendation!: MatTooltip;

  //NEW DATA
  averageCycleContent: number[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private questionsService: QuestionService,
    private cicleService: CicleService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    //NEW CYCLE

    this.questionsService
      .getAllQuestionUserMenstruation()
      .subscribe((data: any) => {
        const question = data?.filter((quest: any) => quest?.userId === userId);
        const lcd = question[0]?.lastCycleDuration || 28;
        const rcd = question[0]?.regularCycleDuration || 28;
        this.averageCycleContent = [lcd, rcd];
        console.log(this.averageCycleContent);
      });

    const idRegisterQuestion = JSON.parse(
      this.localStorageService.getLocalStorage(constants.ID_REGISTER)
    );
    this.questionsService
      .getAllQuestionUserMenstruationById(idRegisterQuestion)
      .subscribe((data: any) => {
        this.myRegisterQuestion = data;
      });
    this.cicleService.getAllCycles(userId).subscribe((data: any) => {
      this.cyclesWithEndNull = data?.filter(
        (item: any) => item?.dateEnd === null
      );
      this.cyclesWithOutEndNull = data?.filter(
        (item: any) => item?.dateEnd !== null
      );
      this.cycles = data;
      this.cycleChart = this.cycles[this.cycles?.length - 1];
    });
  }

  openCicleRegister(): void {
    const dialogRef = this.dialog.open(RegisterCicleComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
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
