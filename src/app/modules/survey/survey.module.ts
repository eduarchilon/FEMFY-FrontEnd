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

@NgModule({
  declarations: [SurveyComponent, PreguntaComponent],
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
  providers: [LocalStorageService],
})
export class SurveyModule {}
