import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { calculateCycleDurantionWithDates } from 'src/app/utils/average-period.utils';
import { Observable } from 'rxjs';
import { cyclesUserSelector } from 'src/app/services/redux/selectors/cycle-user.selector';

@Component({
  selector: 'app-cicle-historial',
  templateUrl: './cicle-historial.component.html',
  styleUrls: ['./cicle-historial.component.scss'],
})
export class CicleHistorialComponent implements OnInit {
  cyclesUser$: Observable<Cycle> = this.store.select(cyclesUserSelector);

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  idUser!: number;

  cycleHistorial: Cycle[] = [];
  actualDurationCycle!: Date;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cyclesUser$.subscribe(async (cycles: Cycle[] | any) => {
      this.actualDurationCycle = await cycles?.filter(
        (item: any) => item?.dateEnd === null
      )[0]?.dateBeging;

      this.cycleHistorial = cycles.filter(
        (objet: any) => objet?.dateEnd !== null
      );
    });
  }

  calculateCycleDurantion(dateBeging: Date, dateEnd: Date): number {
    return calculateCycleDurantionWithDates(
      new Date(dateBeging),
      new Date(dateEnd)
    );
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} de ${month}`;
  }
}
