import { Suspense, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import routers from './router';

import HomeLoad from './components/Loading/HomeLoad/HomeLoad';

function App() {
  const element = useRoutes(routers);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true)
    const timer = setTimeout(() => {
      setLoad(false)
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
