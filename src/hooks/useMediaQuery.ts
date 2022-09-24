import { useTheme } from '@nextui-org/react';
import { useState, useCallback, useEffect } from 'react';

export const useMediaQuery = (breakpoint: string) => {
  const [targetReached, setTargetReached] = useState(false);
  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint})`);
    media.addEventListener('change', updateTarget);
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }
    return () => media.removeEventListener('change', updateTarget);
  }, []);
  return targetReached;
};

export const useIsPhone = () => {
  const theme = useTheme();
  return useMediaQuery(theme.theme?.breakpoints.xs.value as string);
};

// Detect landscape tablet
export const useIsTablet = () => {
  const theme = useTheme();
  return useMediaQuery(theme.theme?.breakpoints.md.value as string);
};
