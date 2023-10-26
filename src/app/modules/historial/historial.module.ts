import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialQuestionsComponent } from './components/historial-questions/historial-questions.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    HistorialQuestionsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatExpansionModule,
  ]
})
export class HistorialModule { }
