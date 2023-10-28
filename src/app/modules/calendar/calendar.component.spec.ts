import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { Store } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

fdescribe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let questionService: jasmine.SpyObj<QuestionService>;
  let cycleService: jasmine.SpyObj<CicleService>;

  beforeEach(() => {
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getUserByLogin',
    ]);
    const questionServiceSpy = jasmine.createSpyObj('QuestionService', [
      'getAllQuestionUserMenstruationById',
    ]);
    const cycleServiceSpy = jasmine.createSpyObj('CicleService', [
      'getAllCycles',
    ]);

    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: Store, useValue: {} },
        { provide: QuestionService, useValue: questionServiceSpy },
        { provide: CicleService, useValue: cycleServiceSpy },
      ],
      imports: [MatDialogModule],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    cycleServiceSpy.getAllCycles.and.returnValue(of([]));
    questionServiceSpy.getAllQuestionUserMenstruationById.and.returnValue(
      of([])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
