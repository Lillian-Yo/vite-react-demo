import { useContext } from 'react';
import { TranslationContext } from './TranstionProvider';

export function useLang() {
  return useContext(TranslationContext);
}
