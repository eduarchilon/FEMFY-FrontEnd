import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyComponent } from './survey.component';
import { AppComponent } from 'src/app/app.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { constants } from 'src/app/constans/constants';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

fdescribe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

  const localStorageService = {
    deleteValue: jasmine.createSpy('deleteValue')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyComponent, AppComponent, PreguntaComponent],
      providers: [
        QuestionService,
        { provide: Store, useValue: {} },
        { provide: LocalStorageService, useValue: localStorageService },
      ],
      imports: [HttpClientModule, MatStepperModule, MatRadioModule, ReactiveFormsModule, BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('omitBasicForm', () => {
    component.omitBasicForm();

    expect(localStorageService.deleteValue).toHaveBeenCalledWith(constants.ID_REGISTER);
  });

  
  it('toggleSkipButtonVisibility should set showSkipButton to true', () => {
    component.toggleSkipButtonVisibility(true);

    expect(component.showSkipButton).toBeTrue();
  });

  it('toggleSkipButtonVisibility should set showSkipButton to false', () => {
    component.toggleSkipButtonVisibility(false);

    expect(component.showSkipButton).toBeFalse();
  });
});
