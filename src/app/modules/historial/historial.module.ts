import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialQuestionsComponent } from './components/historial-questions/historial-questions.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
  ],
  providers: [HistorialService, LocalStorageService],
})
export class HistorialModule { }
