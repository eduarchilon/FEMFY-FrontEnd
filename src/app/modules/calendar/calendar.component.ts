import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { Cycle } from 'src/app/models/cicle.model';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { AppState } from 'src/app/redux/store/app.store';
import { Store } from '@ngrx/store';
import { selectNumberOfOvulation } from 'src/app/redux/selectors/calendar.selector';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  cycle!: Cycle;
  initRegisterId: number = this.localStorageService.getLocalStorage(
    constants.ID_REGISTER
  );
  myRegisterQuestion!: QuestionUserMenstruation;

  nextPeriod: number = 0;
  nextOvulation: number = 0;

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private cicleService: CicleService,
    private router: Router,
    private questionsService: QuestionService,
    private store: Store<AppState>
  ) {
    // this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    const userId = this.localStorageService.getUserByLogin()?.idUser;
    this.cicleService.getAllCycles(userId).subscribe({
      next: (cycles: Cycle[] | any[]) => {
        this.cycle = cycles[cycles?.length - 1];
        this.store.select(selectNumberOfOvulation).subscribe((data: any) => {
          this.nextPeriod = Number(
            new Date(this.cycle?.dateBeging)?.getDate() +
              data?.numberOvulation * 2 -
              new Date().getDate()
          );
          this.nextOvulation = data?.numberOvulation;
        });
      },
    });
    const idRegisterQuestion = JSON.parse(
      this.localStorageService.getLocalStorage(constants.ID_REGISTER)
    );
    this.questionsService
      .getAllQuestionUserMenstruationById(idRegisterQuestion)
      .subscribe((data: any) => {
        this.myRegisterQuestion = data;
      });
  }
}
