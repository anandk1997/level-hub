import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { addResources, getQueryLanguage, otherLanguages, resources } from './resources';
import { env } from 'src/utils/env';

i18n.use(initReactI18next).init({
  resources,
  lng: getQueryLanguage(),
  fallbackLng: 'en',
  debug: env.NODE_ENV === 'development',

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: true,
  },
});

export default i18n;

Object.keys(otherLanguages).forEach((lng) => {
  addResources(lng, otherLanguages[lng].translation, i18n);
});

window.addEventListener('popstate', () => {
  const newLang = getQueryLanguage();

  if (i18n.language !== newLang) i18n.changeLanguage(newLang);
});
