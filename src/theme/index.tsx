import { ReactNode } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      gradient: 'linear-gradient(112deg, #9510f7, #9510f7)',
    },
    fonts: {
      sans: 'Helvetica, Sans-Serif',
    },
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#ffffff',
      background: '$black',
      backgroundAlpha: 'rgba(255, 255, 255, 0.2)', // used for semi-transparent backgrounds like the navbar
      foreground: '$white',
      backgroundContrast: '$black',
      secondary: '#000000',
      gradient: 'linear-gradient(112deg, #9510f7, #9510f7)',
    },
    breakpoints: {
      md: '1181px',
    },
    fonts: {
      sans: 'Helvetica, Sans-Serif',
    },
  },
});

const NextUITheme = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
};

export default NextUITheme;
