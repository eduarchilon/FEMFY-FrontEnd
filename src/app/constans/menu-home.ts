import { Menu } from '../models/menu-model';

export const MENU_NO_LOGUEADO: Menu[] = [
  {
    label: 'Home',
    path: '',
  },
  {
    label: 'Ingresar',
    path: 'login-usuario',
  },
  {
    label: 'Registrarse',
    path: 'registro-usuario',
  },
];

export const MENU_LOGUEADO: Menu[] = [
  {
    label: 'Home',
    path: '',
  },
  {
    label: 'Calendario',
    path: 'calendario',
  },
  {
    label: 'Cuestionario',
    path: 'cuestionario',
  },
  {
    label: 'Foro',
    path: 'foro',
  },
];

export const MENU_PROFILE: Menu[] = [
  {
    label: 'Ver perfil',
    path: 'perfil',
  },
  {
    label: 'Subscripción',
    path: 'subscripcion',
  },
];
