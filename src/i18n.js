import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // 用于加载远程/本地 JSON 文件
import LanguageDetector from 'i18next-browser-languagedetector'; // 自动检测语言（浏览器）

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // 默认语言
    interpolation: {
      escapeValue: false, // React 已经做了 XSS 处理，不需要转义
    },
    resources: {
      en: {
        translation: {
            '你好': 'Hello',
            '欢迎使用我的应用': 'Welcome to my app',
        },
      },
      zh: {
        translation: {
          '你好': '你好',
          '欢迎使用我的应用': '欢迎使用我的应用',
        },
      },
    },
  });

export default i18n;
