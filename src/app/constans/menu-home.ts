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
    label: 'Perfil',
    path: 'perfil',
  },
  {
    label: 'Foro',
    path: 'foro',
  },
];
