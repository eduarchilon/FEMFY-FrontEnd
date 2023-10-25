import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginUsuarioComponent } from './modules/auth/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './modules/auth/registro-usuario/registro-usuario.component';
import { LandingComponent } from './modules/home/landing/landing.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { ForumComponent } from './modules/forum/forum.component';
import { TopicComponent } from './modules/forum/topic/topic.component';
import { DocumentationComponent } from './modules/documentation/documentation.component';
import { SurveyComponent } from './modules/survey/survey.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { IndexComponent } from './modules/home/index/index.component';
import { ConversationComponent } from './modules/forum/conversation/conversation.component';
import { HistorialQuestionsComponent } from './modules/historial/components/historial-questions/historial-questions.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
  },
  {
    path: 'calendario',
    component: CalendarComponent,
  },
  {
    path: 'cuestionario',
    component: SurveyComponent,
  },
  {
    path: 'foro',
    component: ForumComponent,
  },
  {
    path: 'foro/conversation',
    component: ConversationComponent,
  },
  {
    path: 'foro/:id',
    component: TopicComponent,
  },
  {
    path: 'documentation',
    component: DocumentationComponent,
  },
  {
    path: 'historial',
    component: HistorialQuestionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
