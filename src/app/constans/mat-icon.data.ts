import { MatIconCustom } from '../models/mat-icon.model';
import { CustomIcon } from '../models/social-media.model';

export const MAT_ICONS: MatIconCustom[] = [
  { name: 'facebook', path: './assets/svg/brand-facebook-filled.svg' },
  { name: 'twitter', path: './assets/svg/brand-twitter-filled.svg' },
  { name: 'instagram', path: './assets/svg/brand-instagram.svg' },
  { name: 'youtube', path: './assets/svg/brand-youtube-filled.svg' },
  { name: 'ovulationDay', path: './assets/svg/ovum.svg' },
  { name: 'fertileDay', path: './assets/svg/flower.svg' },
  { name: 'menstrualDay', path: './assets/svg/blood.svg' },
  { name: 'folicularDay', path: './assets/svg/folicular.svg' },
  { name: 'luteaDay', path: './assets/svg/lutea.svg' },
  { name: 'googleCalendar', path: './assets/svg/google-calendar-icon.svg' },
  { name: 'whatsApp', path: './assets/svg/whats-app-icon.svg' },
];

export const CUSTOM_ICONS: any = {
  facebook: {
    name: 'facebook',
    path: './assets/svg/brand-facebook-filled.svg',
  },
  twitter: { name: 'twitter', path: './assets/svg/brand-twitter-filled.svg' },
  instagram: {
    name: 'instagram',
    path: './assets/svg/brand-instagram.svg',
    url: '',
  },
  youtube: { name: 'youtube', path: './assets/svg/brand-youtube-filled.svg' },
};

export const CYCLE_STATE: any = {
  ovulationDay: {
    name: 'ovulationDay',
    path: './assets/svg/ovum.svg',
    desc: 'Estas en tus días de ovulación',
  },
  fertileDay: {
    name: 'fertileDay',
    path: './assets/svg/flower.svg',
    desc: 'Estas en tus días fértiles',
  },
  menstrualDay: {
    name: 'menstrualDay',
    path: './assets/svg/blood.svg',
    desc: 'Estas en tus días de menstruación',
  },
  folicularDay: {
    name: 'folicularDay',
    path: './assets/svg/blood.svg',
    desc: 'Estas en la fase folicular',
  },
  luteaDay: {
    name: 'luteaDay',
    path: './assets/svg/blood.svg',
    desc: 'Estas en la fase lútea',
  },
};

export const GOOGLE_CALENDAR_ICON = {
  name: 'googleCalendar',
  path: './assets/svg/google-calendar-icon.svg',
  desc: 'Vincular a Google Calendar',
};

export const WHATS_APP_ICON = {
  name: 'whatsApp',
  path: './assets/svg/whats-app-icon.svg',
  desc: "Vincular por What's App",
};

// //FOOTER
// export const MAT_FOOTER: MatIconCustom[] = [
//   { name: 'instagram', path: './assets/svg/brand-instagram.svg' },
// ];
// const footerUrls: any[] = [{ url: 'www.google.com' }];

// export const SOCIAL_MEDIA_FOOTER: CustomIcon[] = MAT_FOOTER.map(
//   (smf, index) => {
//     return {
//       icon: smf,
//       url: footerUrls[index]?.url,
//     };
//   }
// );
