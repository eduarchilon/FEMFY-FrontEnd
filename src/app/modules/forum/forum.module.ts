import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ForumComponent } from './forum.component';
import { TopicComponent } from './topic/topic.component';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConversationComponent } from './conversation/conversation.component';
import { RegisterPostComponent } from './components/register-post/register-post.component';
import { PostService } from 'src/app/services/post/post.service';
import { TopicService } from 'src/app/services/topic/topic.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    ForumComponent,
    TopicComponent,
    ConversationComponent,
    RegisterPostComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    EditorModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule,
  ],
  providers: [SpinnerService, LoaderService, PostService, TopicService],
})
export class ForumModule {}
