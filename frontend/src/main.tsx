import React from 'react';
import { AppContextProvider } from './contexts/AppContext';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';

// Load global CSS
import './index.scss';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000
    }
  }
});

// Render app
ReactDOM.render(
  <React.StrictMode>
    <div className="app__container">
      <Router>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </AppContextProvider>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);