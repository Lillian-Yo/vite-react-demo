import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import TranslationProvider from './TranstionProvider';
import store from './store';

import App from './App.jsx'
import './i18n'; // 确保 i18n 初始化
import './index.css'
import './style.scss'
import '@/assets/css/global.css'
import '@/assets/css/media.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TranslationProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </TranslationProvider>
  </BrowserRouter>
);

