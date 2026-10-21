import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arHome from './locales/ar/Home.json';
import frHome from './locales/fr/Home.json';
import enHome from './locales/en/Home.json';

const resources = {
  ar: {
    Home: arHome,
  },
  fr: {
    Home: frHome,
  },
  en: {
    Home: enHome,
  },
};

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'ar' : 'ar';
const initialLang = ['ar', 'fr', 'en'].includes(savedLang) ? savedLang : 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'ar',
    ns: ['Home'],
    defaultNS: 'Home',
    interpolation: {
      escapeValue: false,
    },
  });

// Automatically update HTML dir and lang attributes on language change
if (typeof document !== 'undefined') {
  const updateHtmlAttributes = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', lang);
  };

  updateHtmlAttributes(initialLang);

  i18n.on('languageChanged', (lng) => {
    updateHtmlAttributes(lng);
  });
}

export default i18n;
