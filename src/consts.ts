import type { Site, Socials } from './types';

export const SITE: Site = {
  COMPANY_NAME: 'Stabilny Najem',
  LEGAL_NAME: 'Stabilny Najem',
  TITLE: 'Stabilny najem. Bez Twojego czasu.',
  DESCRIPTION: 'Stabilny dochód z najmu nieruchomości. Profesjonalne zarządzanie bez Twojego czasu.',
  CANONICAL_URL: import.meta.env.DEV
    ? 'http://localhost:4321'
    : 'https://stabilny-najem.vercel.app',
  LOCALE: 'pl',
  TELEPHONE: '',
  EMAIL: '',
  ADDRESS: 'Kraków',

  OG_IMAGE: '/og-image.webp',

  TWITTER: {
    CREATOR: '@stabilnynajem',
    CARD: 'summary_large_image',
  },
};

export const SOCIALS: Socials = [
  {
    NAME: 'Instagram',
    ICON: 'instagram',
    LABEL: `${SITE.COMPANY_NAME} on Instagram`,
    HREF: 'https://www.instagram.com/',
  },
  {
    NAME: 'Facebook',
    ICON: 'facebook',
    LABEL: `${SITE.COMPANY_NAME} on Facebook`,
    HREF: 'https://www.facebook.com/',
  },
  {
    NAME: 'Pinterest',
    ICON: 'pinterest',
    LABEL: `${SITE.COMPANY_NAME} on Pinterest`,
    HREF: 'https://www.pinterest.com/',
  },
  {
    NAME: 'Youtube',
    ICON: 'youtube',
    LABEL: `${SITE.COMPANY_NAME} on YouTube`,
    HREF: 'https://www.youtube.com/',
  },
];
