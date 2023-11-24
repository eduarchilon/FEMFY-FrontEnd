import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cycle } from 'src/app/models/cicle.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-edit-cycle',
  templateUrl: './edit-cycle.component.html',
  styleUrls: ['./edit-cycle.component.scss'],
})
export class EditCycleComponent implements OnInit {
  cycleChart!: Cycle;

  constructor(
    private dialogRef: MatDialogRef<EditCycleComponent>,
    private cicleService: CicleService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cycleChart = this.data?.cycleChart;
    console.log(this.cycleChart);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  errorInput!: string;

  saveDaysOfBleeding(cycleChart: Cycle, daysOfBleeding: number | any): void {
    if (daysOfBleeding < 8) {
      this.cicleService
        .editCycle({ ...cycleChart, daysOfBleeding: Number(daysOfBleeding) })
        .subscribe({
          next: (res: any) => res,
        });
      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    } else {
      this.errorInput = 'La duración del sangrado no debe ser mayor a 8.';
    }
  }
}
