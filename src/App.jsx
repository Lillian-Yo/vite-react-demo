import { Suspense, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import routers from './router';

import PageLoad from './components/Loading/PageLoad/PageLoad';

function App() {
  const element = useRoutes(routers);

  useEffect(() => {
    let $loader = document.querySelector('.loader');
    $loader.classList.remove('loader--active')
  },[]);

  return (
    <div className='App'>
      <PageLoad></PageLoad>
      <Suspense fallback={<></>}>
        {element}
      </Suspense>
    </div>
  )
}

export default App
