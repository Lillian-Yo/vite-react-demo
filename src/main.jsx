import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import reducers from './reducers/reducers.js';

import App from './App.jsx'

import './index.css'
import '@/assets/css/global.css'
import '@/assets/css/media.scss'

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk))
);

ReactDOM.createRoot(document.getElementById('root')).render(
  (<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>)
);
