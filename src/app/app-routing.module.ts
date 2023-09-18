import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginUsuarioComponent } from './modules/auth/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './modules/auth/registro-usuario/registro-usuario.component';
import { LandingComponent } from './modules/home/landing/landing.component';
import { CalendarComponent } from './modules/calendar/calendar.component';

const routes: Routes = [
  {
    path: 'registro-usuario',
    component: HomeComponent,
  },
  {
    path: 'login-usuario',
    component: LoginUsuarioComponent,
  },
  {
    path: '',
    component: RegistroUsuarioComponent,
  },
  {
    path: 'calendario',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
