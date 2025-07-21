import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import TranslationProvider from './TranstionProvider';
import reducers from './reducers/reducers.js';

import App from './App.jsx'
import './i18n'; // 确保 i18n 初始化
import './index.css'
import '@/assets/css/global.css'
import '@/assets/css/media.scss'

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk))
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TranslationProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TranslationProvider>
  </BrowserRouter>
);

