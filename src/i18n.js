import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Fixed the typo here
    backend: {
      loadPath: '/i18n/{{lng}}/{{ns}}.json',
    },
    ns: ['Home'],
    defaultNS: 'Home',
    interpolation: { escapeValue: false }
  });

export default i18n;
