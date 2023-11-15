import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRGeneratorComponent } from './QRGenerator.component';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  declarations: [QRGeneratorComponent],
  imports: [QrCodeModule,
  CommonModule,
],
  exports: [QRGeneratorComponent],
})
export class QRGeneratorModule { }