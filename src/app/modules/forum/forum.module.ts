import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ForumComponent } from './forum.component';
import { TopicComponent } from './topic/topic.component';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@NgModule({
  declarations: [ForumComponent, TopicComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  providers: [SpinnerService],
})
export class ForumModule {}
