import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ForumComponent } from 'src/app/modules/forum/forum.component';
import { SurveyComponent } from 'src/app/modules/survey/survey.component';
import { LoginGuardian } from 'src/app/utils/login-guardian.guardian';

const routes: Routes = [
  {
    path: 'login-usuario',
    component: LoginUsuarioComponent,
  },
  {
    path: 'registro-usuario',
    component: RegistroUsuarioComponent,
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
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
