import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
  ]
})
export class DocumentationModule { }
