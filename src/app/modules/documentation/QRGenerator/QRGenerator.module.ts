import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRGeneratorComponent } from './QRGenerator.component';
import { QrCodeModule } from 'ng-qrcode';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [QRGeneratorComponent],
  imports: [QrCodeModule,
  CommonModule,
  MatSnackBarModule,
],
  exports: [QRGeneratorComponent],
})
export class QRGeneratorModule { }