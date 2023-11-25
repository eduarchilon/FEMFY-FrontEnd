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
import { LoginGuardian } from './utils/login-guardian.guardian';
import { SubscriptionComponent } from './modules/subscription/subscription.component';
import { InformationComponent } from './modules/information/information.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'calendario',
    component: CalendarComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'cuestionario',
    component: SurveyComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'foro',
    component: ForumComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'foro/:id',
    component: TopicComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'post/:id',
    component: ConversationComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'documentation',
    component: DocumentationComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'historial',
    component: HistorialQuestionsComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'information',
    component: InformationComponent,
    canActivate: [LoginGuardian],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
