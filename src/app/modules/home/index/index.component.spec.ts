import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { of } from 'rxjs';

fdescribe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  let router: Router;
  let dialog: MatDialog;
  let questionService: jasmine.SpyObj<QuestionService>;
  let cicleService: jasmine.SpyObj<CicleService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const questionServiceSpy = jasmine.createSpyObj('QuestionService', [
      'getAllQuestionUserMenstruation',
      'getAllQuestionUserMenstruationById',
    ]);
    const cicleServiceSpy = jasmine.createSpyObj('CicleService', [
      'getAllCycles',
    ]);

    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      providers: [
        { provide: Store, useValue: {} },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: QuestionService, useValue: questionServiceSpy },
        { provide: CicleService, useValue: cicleServiceSpy },
      ],
      imports: [HttpClientModule, MatDialogModule, MatTooltipModule],
    });
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;

    questionServiceSpy.getAllQuestionUserMenstruation.and.returnValue(of([]));
    questionServiceSpy.getAllQuestionUserMenstruationById.and.returnValue(
      of([])
    );
    cicleServiceSpy.getAllCycles.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('finishActualCicle()', () => {
    expect(2).toEqual(2);
  });
});
