import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'src/store';

import 'antd/dist/reset.css';
import '../styles/globals.css';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      notifyOnChangeProps: 'tracked'
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
