import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ForumComponent } from './forum.component';
import { TopicComponent } from './topic/topic.component';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConversationComponent } from './conversation/conversation.component';

@NgModule({
  declarations: [ForumComponent, TopicComponent, ConversationComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  providers: [SpinnerService, LoaderService],
})
export class ForumModule {}
