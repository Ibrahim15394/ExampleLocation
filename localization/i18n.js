import en from './translations/en.json'
import ar from './translations/ar.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async callback => {
      const savedDataJSON = await AsyncStorage.getItem('user-language');
      const lng = savedDataJSON ? savedDataJSON : 'en';
      callback(lng);
    },
    init: () => {},
    cacheUserLanguage: async lng => {
      await AsyncStorage.setItem('user-language', lng);
    },
  };

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    }
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug:true,
     compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    pluralSeparator: '_',
    keySeparator: '.',
  });

  export const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  export default i18n;