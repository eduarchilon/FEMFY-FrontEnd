import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginUsuarioComponent } from './modules/auth/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './modules/auth/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login-usuario',
    component: LoginUsuarioComponent,
  },
  {
    path: 'registro-usuario',
    component: RegistroUsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
