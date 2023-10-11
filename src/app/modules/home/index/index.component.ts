import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AgPolarChartOptions } from 'ag-charts-community';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterCicleComponent } from '../components/register-cicle/register-cicle.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { Cycle } from 'src/app/models/cicle.model';
import { QuestionUserMenstruation } from 'src/app/models/question.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  myCycle: QuestionUserMenstruation = {};

  user!: any; //cambiar objeto

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private questionsService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionsService
      .getAllQuestionUserMenstruation()
      .subscribe((data: any) => {
        this.myCycle = data[0];
        console.log(this.myCycle);
      });
    //cambiar
    this.authService._userFinded.subscribe((user: any) => {
      this.user = user;
    });
  }

  openCicleRegister(): void {
    const dialogRef = this.dialog.open(RegisterCicleComponent, {
      panelClass: ['max-md:!w-[50%]', 'max-sm:!w-[100%]', '!rounded-[20px]'],
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
