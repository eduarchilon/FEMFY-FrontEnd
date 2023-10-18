import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { Cycle } from 'src/app/models/cicle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  cycle!: Cycle;

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private cicleService: CicleService,
    private router: Router
  ) {
    // this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    this.cicleService.getAllCycles(userId).subscribe({
      next: (cycles: Cycle[] | any[]) => {
        this.cycle = cycles[cycles?.length - 1];
      },
    });
  }
}
