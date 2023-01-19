import Layout from '@/components/Layout';
import GlobalProvider from '@/globalContext';
import '@/styles/globals.scss';
import theme from '@/theme';
import { ThemeProvider } from '@emotion/react';

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </GlobalProvider>
  );
}
