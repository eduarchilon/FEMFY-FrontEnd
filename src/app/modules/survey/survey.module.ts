import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { SurveyComponent } from './survey.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { QuestionMenopausicaComponent } from './components/question-menopausica/question-menopausica.component';
import { QuestionOtroComponent } from './components/question-otro/question-otro.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QuestionMenopausicaService } from 'src/app/services/question-menopausica/question-menopausica.service';
import { QuestionCongenitalComponent } from './components/question-congenital/question-congenital.component';
import { QuestionHormonalComponent } from './components/question-hormonal/question-hormonal.component';
import { QuestionCongenitalService } from 'src/app/services/question-congenital/question-congenital.service';
import { QuestionHormonalService } from 'src/app/services/question-hormonal/question-hormonal.service';

@NgModule({
  declarations: [
    SurveyComponent,
    PreguntaComponent,
    QuestionMenopausicaComponent,
    QuestionOtroComponent,
    QuestionCongenitalComponent,
    QuestionHormonalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatRadioModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    LocalStorageService,
    CicleService,
    AuthService,
    QuestionMenopausicaService,
    QuestionCongenitalService,
    QuestionHormonalService
  ],
})
export class SurveyModule {}
