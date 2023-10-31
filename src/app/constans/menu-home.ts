import { Menu } from '../models/menu-model';

export const MENU_NO_LOGUEADO: Menu[] = [
  {
    label: 'Inicio',
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
    label: 'Inicio',
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
    path: 'subscription',
    icon: 'subscriptions',
    iconColor: 'accent',
  },
  {
    label: 'Información personal',
    path: 'information',
    icon: 'library_books',
    iconColor: 'secondary',
  },
];

export const MAT_MOBILE_NO_LOGGUEADO: Menu[] = [
  {
    label: 'Inicio',
    path: '',
    icon: 'home',
  },
  {
    label: 'Ingresar',
    path: 'login-usuario',
    icon: 'login',
  },
  {
    label: 'Registrarse',
    path: 'registro-usuario',
    icon: 'person_add',
  },
];

export const MAT_MOBILE_LOGUEADO: Menu[] = [
  {
    label: 'Inicio',
    path: '',
    icon: 'home',
  },
  {
    label: 'Calendario',
    path: 'calendario',
    icon: 'event',
  },
  {
    label: 'Estudios',
    path: 'documentation',
    icon: 'source',
  },
  {
    label: 'Comunidad',
    path: 'foro',
    icon: 'groups',
  },
  // {
  //   label: 'Más',
  //   path: '',
  //   icon: 'more_vert',
  // },
];
