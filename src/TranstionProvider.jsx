import {useState, useEffect, createContext } from 'react';
// Context 存储当前语言
export const TranslationContext = createContext('en');

export default function TranslationProvider({ children }) {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const handler = (lng) => {
      console.log('languageChanged', lng);
      setLang(lng);
    };
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, []);

  return (
    <TranslationContext.Provider value={lang}>
      {children}
    </TranslationContext.Provider>
  );
}