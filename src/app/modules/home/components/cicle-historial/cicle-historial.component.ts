import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Cycle, CycleHistorial } from 'src/app/models/cicle.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-cicle-historial',
  templateUrl: './cicle-historial.component.html',
  styleUrls: ['./cicle-historial.component.scss'],
})
export class CicleHistorialComponent implements OnInit {
  @Input() cycleHistorial: CycleHistorial[] = [];

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  idUser!: number;
  cycleContainer: Cycle[] = [];

  constructor(
    private store: Store<AppState>,
    private cicleService: CicleService
  ) {}

  ngOnInit(): void {
    console.log(this.cycleHistorial);
  }
}
