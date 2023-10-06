import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginUsuarioComponent } from './modules/auth/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './modules/auth/registro-usuario/registro-usuario.component';
import { LandingComponent } from './modules/home/landing/landing.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { SurveyComponent } from './modules/survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'calendario',
    component: CalendarComponent,
  },
  {
    path: 'cuestionario',
    component: SurveyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
