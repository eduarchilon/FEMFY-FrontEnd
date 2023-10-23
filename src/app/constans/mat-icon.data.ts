import { MatIconCustom } from '../models/mat-icon.model';
import { CustomIcon } from '../models/social-media.model';

export const MAT_ICONS: MatIconCustom[] = [
  { name: 'facebook', path: './assets/svg/brand-facebook-filled.svg' },
  { name: 'twitter', path: './assets/svg/brand-twitter-filled.svg' },
  { name: 'instagram', path: './assets/svg/brand-instagram.svg' },
  { name: 'youtube', path: './assets/svg/brand-youtube-filled.svg' },
  { name: 'ovulationDay', path: './assets/svg/ovum.svg' },
  { name: 'fertileDay', path: './assets/svg/flower.svg'},
  { name: 'menstrualDay', path: './assets/svg/blood.svg'},
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
  },
  fertileDay: {
    name: 'fertileDay',
    path: './assets/svg/flower.svg',
  },
  menstrualDay: {
    name: 'menstrualDay',
    path: './assets/svg/blood.svg',
  },
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
