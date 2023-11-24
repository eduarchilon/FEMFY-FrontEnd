import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Cycle } from 'src/app/models/cicle.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-finish-cycle',
  templateUrl: './finish-cycle.component.html',
  styleUrls: ['./finish-cycle.component.scss'],
})
export class FinishCycleComponent implements OnInit {
  cycleChart!: Cycle;

  validationDate!: string;

  constructor(
    private dialogRef: MatDialogRef<FinishCycleComponent>,
    private cicleService: CicleService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cycleChart = this.data?.cycleChart;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveFinishCycle(cycleChart: Cycle, endDate: Date | any | string): void {
    const newDate = new Date();
    let año = newDate.getFullYear();
    let mes = newDate.getMonth() + 1;
    let dia = newDate.getDate();

    let fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${
      dia < 10 ? '0' : ''
    }${dia}`;

    this.validationDate = '';
    const end = moment(endDate);
    const beging = moment(new Date(cycleChart?.dateBeging));
    const realEnd = beging.clone().add(20, 'days');
    const today = moment(new Date());
    if (end.isBefore(beging)) {
      this.validationDate =
        'No se puede elegir una fecha antes del inicio del ciclo';
    } else if (end.isSameOrAfter(realEnd)) {
      this.cicleService
        .editCycle({
          ...cycleChart,
          dateEnd: endDate ? endDate : new Date().toISOString(),
        })
        .subscribe({
          next: (res: any) => {
            this.cicleService
              .registerCycle({
                dateBeging: fechaFormateada,
                daysOfBleeding: cycleChart?.daysOfBleeding,
                idUser: cycleChart?.idUser,
              })
              .subscribe((res: any) => {
                this.notificationService
                  .enviarNotificacion(
                    '¡Ciclo finalizado con exito!',
                    'Muchas gracias por contar con femfy . 😊'
                  )
                  .subscribe({
                    next: (res: any) => res,
                  });
                if (res) {
                  this.router.navigate(['/']).then(() => {
                    location.reload();
                  });
                }
              });
          },
        });
    } else {
      this.validationDate = 'Por el momento no se puede finalizar el ciclo';
    }
  }

  resetForm(): void {
    this.validationDate = '';
  }
}
