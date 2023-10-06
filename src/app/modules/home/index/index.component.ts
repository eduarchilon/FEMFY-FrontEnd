import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AgPolarChartOptions } from 'ag-charts-community';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterCicleComponent } from '../components/register-cicle/register-cicle.component';

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

  user!: any; //cambiar objeto

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //cambiar
    this.authService._userFinded.subscribe((user: any) => {
      this.user = user;
    });
  }

  openCicleRegister(): void {
    const dialogRef = this.dialog.open(RegisterCicleComponent, {
      panelClass: [
        'max-md:!w-[80%]',
        'max-sm:!w-[100%]',
        '!max-w-[100vw]',
        '!w-[60%]',
        'max-md:!h-[80%]',
        'max-sm:!h-[100%]',
        '!h-[500px%]',
      ],
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
