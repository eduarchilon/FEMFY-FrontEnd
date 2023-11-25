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
import { jsPDF } from 'jspdf';
import * as moment from 'moment';
import { LOGO_DATA_URL } from 'src/app/constans/data-url';
import { calculateCycleDurantionWithDates } from 'src/app/utils/average-period.utils';
import { HourNotificationComponent } from '../components/hour-notification/hour-notification.component';

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
          if (lcd && lcd > 20) {
            this.averageQuestionCycleContent.push(lcd);
          } else {
            this.averageQuestionCycleContent.push(35);
          }

          if (rcd && rcd > 20) {
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

  cyclesHistorial = [];

  generatePDF(cycles: any[]) {
    const pdf = new jsPDF();

    const logoDataUrl = LOGO_DATA_URL;

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    const x = pdfWidth - margin - 30; // 50 es el ancho del isologotipo
    const y = margin;

    pdf.addImage(logoDataUrl, 'PNG', x, y, 32, 30);

    const nombreUsuario = [
      this.localStorageService.getUserByLogin()?.firstName,
    ];
    const correoUsuario = [this.localStorageService.getUserByLogin()?.email];
    pdf.text(`Usuaria: ${nombreUsuario}`, 10, 30);
    pdf.text(`Correo: ${correoUsuario}`, 10, 40);

    cycles.forEach((CycleHistorial, index) => {
      const textY = 60 + index * 50;

      // moment().locale('es').format('DD [de] MMMM')
      if (CycleHistorial.dateEnd === null) {
        pdf.text(`Ciclo actual`, 20, textY);
        pdf.text(
          `Inicio: ${moment(new Date(CycleHistorial.dateBeging))
            .add(1, 'days')
            .locale('es')
            .format('DD [de] MMMM')}`,
          20,
          textY + 10
        );
        pdf.text(
          `Duración estimado del período: ${CycleHistorial.daysOfBleeding} días`,
          20,
          textY + 20
        );
        pdf.setDrawColor(171, 95, 232);
        pdf.setLineWidth(0.5);
        pdf.line(20, textY + 40, 190, textY + 40);
      } else if (CycleHistorial.dateEnd !== null) {
        pdf.text(`Ciclo ${index + 1}`, 20, textY);

        // const startDate = moment(new Date(CycleHistorial.dateBeging))
        //   .add(1, 'days')
        //   .locale('es')
        //   .format('DD [de] MMMM');
        // const endDate = moment(new Date(CycleHistorial.dateEnd))
        //   .add(1, 'days')
        //   .locale('es')
        //   .format('DD [de] MMMM');
        const startDate = new Date(CycleHistorial.dateBeging);
        const endDate = new Date(CycleHistorial.dateEnd);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error('Fechas no válidas');
        } else {
          const durationInDays = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          pdf.text(
            `Duración del ciclo: ${durationInDays} días`,
            20,
            textY + 10
          );
        }

        pdf.text(
          `Duración del período: ${CycleHistorial.daysOfBleeding} días`,
          20,
          textY + 20
        );

        const startDat = moment(new Date(CycleHistorial.dateBeging))
          .add(1, 'days')
          .locale('es')
          .format('DD [de] MMMM');
        const endDat = moment(new Date(CycleHistorial.dateEnd))
          .add(1, 'days')
          .locale('es')
          .format('DD [de] MMMM');
        pdf.text(`Fecha: ${startDat} al ${endDat}`, 20, textY + 30);

        // Dibujar una línea violeta después de cada ciclo (excepto el último)
        pdf.setDrawColor(171, 95, 232);
        pdf.setLineWidth(0.5);
        pdf.line(20, textY + 40, 190, textY + 40);
      }
    });

    // Agrega contenido al PDF (ciclos menstruales, encabezados, etc.)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    pdf.text(`Fecha: ${formattedDate}`, 10, 20);
    pdf.text('Historial de Ciclos Menstruales', 10, 10);

    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);

    // Abre una nueva ventana o pestaña con la vista previa del PDF
    window.open(url, '_blank');
  }

  editHourNotification(): void {
    const dialogRef = this.dialog.open(HourNotificationComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
    });
  }
}
