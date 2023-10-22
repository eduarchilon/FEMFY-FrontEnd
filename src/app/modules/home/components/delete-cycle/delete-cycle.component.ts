import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cycle } from 'src/app/models/cicle.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-delete-cycle',
  templateUrl: './delete-cycle.component.html',
  styleUrls: ['./delete-cycle.component.scss'],
})
export class DeleteCycleComponent implements OnInit {
  cycleChart!: Cycle;

  constructor(
    private dialogRef: MatDialogRef<DeleteCycleComponent>,
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

  deleteCycle(cycleChart: Cycle | any): void {
    this.cicleService.deleteCycle(cycleChart?.id).subscribe((res: any) => res);
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}
