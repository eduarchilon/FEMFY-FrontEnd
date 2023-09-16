import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginUsuarioComponent } from './modules/auth/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './modules/auth/registro-usuario/registro-usuario.component';
import { LandingComponent } from './modules/home/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login-usuario',
        component: LoginUsuarioComponent,
      },
      {
        path: 'registro-usuario',
        component: RegistroUsuarioComponent,
      },
      {
        path: '',
        component: LandingComponent,
      },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
