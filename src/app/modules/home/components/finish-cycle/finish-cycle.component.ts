import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cycle } from 'src/app/models/cicle.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-finish-cycle',
  templateUrl: './finish-cycle.component.html',
  styleUrls: ['./finish-cycle.component.scss'],
})
export class FinishCycleComponent implements OnInit {
  cycleChart!: Cycle;

  constructor(
    private dialogRef: MatDialogRef<FinishCycleComponent>,
    private cicleService: CicleService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cycleChart = this.data?.cycleChart;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveFinishCycle(cycleChart: Cycle, endDate: any): void {
    this.cicleService
      .editCycle({
        ...cycleChart,
        dateEnd: endDate ? endDate : new Date().toISOString(),
      })
      .subscribe({
        next: (res: any) => res,
      });
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}
