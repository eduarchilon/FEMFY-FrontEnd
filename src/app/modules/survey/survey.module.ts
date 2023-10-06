import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { SurveyComponent } from './survey.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    SurveyComponent,
    PreguntaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatRadioModule
  ]
})
export class SurveyModule { }
