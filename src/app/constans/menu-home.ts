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
    label: 'Estudios',
    path: 'documentation',
  },
  {
    label: 'Comunidad',
    path: 'foro',
  },
];

export const MENU_PROFILE: Menu[] = [
  {
    label: 'Ver perfil',
    path: 'perfil',
    icon: 'person',
    iconColor: 'primary',
  },
  {
    label: 'Suscripción',
    path: 'suscripcion',
    icon: 'subscriptions',
    iconColor: 'accent',
  },
];
