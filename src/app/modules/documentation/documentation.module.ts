import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QRGeneratorModule } from './QRGenerator/QRGenerator.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    MatProgressSpinnerModule,
    QRGeneratorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [LocalStorageService, LoaderService],
})
export class DocumentationModule {}
