import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routers from './router';

import './App.css';



function App() {
  const element = useRoutes(routers);
  const queryClient = new QueryClient();

  return (
    <div className={`App lang-${lang}`}>
      <Suspense fallback={<></>}>
          <QueryClientProvider client={queryClient}>
              {element}
          </QueryClientProvider>
      </Suspense>
      </div>
  )
}

export default App
