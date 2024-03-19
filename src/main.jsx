import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//import reducers from './reducers/reducers.js';

import Layout from './containers/layout/layout.jsx';
import App from './App.jsx'

import './index.css'


const store = createStore(
  applyMiddleware(thunk)
)

ReactDOM.createRoot(document.getElementById('root')).render(
  (<Provider store={store}>
    <BrowserRouter>
      {/* <App /> */}
      <Layout></Layout>
    </BrowserRouter>
  </Provider>)
);
