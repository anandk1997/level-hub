import { ReactNode, Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/store/redux';
import { Provider } from 'react-redux';

import { LineProgress } from 'src/components/lineProgress';
import { ThemeProvider } from 'src/theme/theme-provider';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <Suspense fallback={<LineProgress />}>
                <Toaster position="top-center" reverseOrder={false} />

                {children}
              </Suspense>
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};
