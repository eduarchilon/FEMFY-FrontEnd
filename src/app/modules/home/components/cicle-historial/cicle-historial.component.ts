import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Cycle, CycleHistorial } from 'src/app/models/cicle.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { calculateCycleDurantionWithDates } from 'src/app/utils/average-period.utils';

@Component({
  selector: 'app-cicle-historial',
  templateUrl: './cicle-historial.component.html',
  styleUrls: ['./cicle-historial.component.scss'],
})
export class CicleHistorialComponent implements OnInit {
  @Input() cycles: CycleHistorial[] = [];

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  idUser!: number;

  cycleHistorial: Cycle[] = [];
  actualDurationCycle!: Date;

  constructor(
    private store: Store<AppState>,
    private cicleService: CicleService
  ) {}

  ngOnInit(): void {
    this.actualDurationCycle = this.cycles[this.cycles?.length - 1]?.dateBeging;
    this.cycleHistorial = this.cycles.filter(
      (objet: any) => objet?.dateEnd !== null
    );
  }

  calculateCycleDurantion(dateBeging: Date, dateEnd: Date): number {
    return calculateCycleDurantionWithDates(
      new Date(dateBeging),
      new Date(dateEnd)
    );
  }
}
