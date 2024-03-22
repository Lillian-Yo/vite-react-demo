import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routers from './router';

function App() {
  const element = useRoutes(routers);
  return (
    <div className='App'>
      <Suspense fallback={<>加载中...</>}>
        {element}
      </Suspense>
    </div>
  )
}

export default App
