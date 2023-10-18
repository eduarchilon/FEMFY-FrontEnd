import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AgPolarChartOptions } from 'ag-charts-community';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterCicleComponent } from '../components/register-cicle/register-cicle.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { Cycle, CycleHistorial } from 'src/app/models/cicle.model';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { constants } from 'src/app/constans/constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public fechaActual: Date = new Date();
  public fechaFormateada: string = this.formatDate(this.fechaActual);
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  myCycle: QuestionUserMenstruation = {};
  cycles: CycleHistorial[] = [];
  initRegisterId: number = this.localStorageService.getLocalStorage(
    constants.ID_REGISTER
  );

  user!: any; //cambiar objeto



  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private questionsService: QuestionService,
    private cicleService: CicleService,
    private localStorageService: LocalStorageService

  ) {}

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} de ${month}`;
  }
  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    this.cicleService.getAllCycles(userId).subscribe({
      next: (cycles: Cycle[] | any[]) => {
        this.cycles = [...cycles];
      },
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
}
