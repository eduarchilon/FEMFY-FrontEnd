import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ForumComponent } from './forum.component';
import { TopicComponent } from './topic/topic.component';

@NgModule({
  declarations: [ForumComponent, TopicComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ]
})
export class ForumModule { }
