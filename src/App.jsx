import { Suspense, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import routers from './router';
import LoadAnime from '@/components/Loading/HomeLoad/LoadAnime';

import HomeLoad from './components/Loading/HomeLoad/HomeLoad';

function App() {
  const element = useRoutes(routers);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false)
      LoadAnime();
    }, 6500);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className='App'>
      {
        load ? (<HomeLoad></HomeLoad>) :
          <Suspense fallback={<></>}>
            {element}
          </Suspense>
      }
    </div>
  )
}

export default App
