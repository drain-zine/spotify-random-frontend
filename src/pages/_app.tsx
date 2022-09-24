import 'src/theme/theme.scss';
import type { AppProps } from 'next/app';
import NextUITheme from '../theme';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUITheme>
      <Component {...pageProps} />
    </NextUITheme>
  );
}

export default wrapper.withRedux(MyApp);
