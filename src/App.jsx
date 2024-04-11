import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import routers from './router';

import './App.css';

function App() {
  const element = useRoutes(routers);

  return (
    <div className='App'>
      <Suspense fallback={<></>}>
        {element}
      </Suspense>
    </div>
  )
}

export default App
