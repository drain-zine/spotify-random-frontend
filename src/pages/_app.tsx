import '@theme/scss';
import type { AppProps } from 'next/app';
import NextUITheme from '@theme';
import { wrapper } from '@redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '@utils';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <NextUITheme>
      <Component {...pageProps} />
    </NextUITheme>
  );
}

export default wrapper.withRedux(MyApp);
