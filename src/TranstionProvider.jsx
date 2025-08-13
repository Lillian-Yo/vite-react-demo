import {useState, useEffect, createContext } from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
// Context 存储当前语言
export const TranslationContext = createContext('en');

export default function TranslationProvider({ children }) {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const handler = (lng) => {
      setLang(lng);
    };
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, []);

  return (
    <TranslationContext.Provider value={lang}>
        <ConfigProvider locale={lang === 'en' ? enUS : zhCN} getPopupContainer={() => document.querySelector('.App')}>
            {children}
        </ConfigProvider>
    </TranslationContext.Provider>
  );
}