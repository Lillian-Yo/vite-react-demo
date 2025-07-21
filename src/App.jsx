import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './containers/home/home';
// import routers from './router';

import './App.css';



function App() {
  // const element = useRoutes(routers);
  const queryClient = new QueryClient();

  return (
    <div className={`App lang-${lang}`}>
      <Suspense fallback={<></>}>
          <QueryClientProvider client={queryClient}>
              <Home />
          </QueryClientProvider>
      </Suspense>
      </div>
  )
}

export default App
