import { useTheme } from '@nextui-org/react';
import { useState, useCallback, useEffect } from 'react';

export const useMediaQuery = (breakpoint: string, max: boolean) => {
  const [targetReached, setTargetReached] = useState(false);
  const query = max ? 'max-width' : 'min-width';
  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);
  useEffect(() => {
    const media = window.matchMedia(`(${query}: ${breakpoint})`);
    media.addEventListener('change', updateTarget);
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }
    return () => media.removeEventListener('change', updateTarget);
  }, []);
  return targetReached;
};

export const useIsPhone = (max = true) => {
  const theme = useTheme();
  return useMediaQuery(theme.theme?.breakpoints.xs.value as string, max);
};

// Detect landscape tablet
export const useIsTablet = (landscape = true, max = true) => {
  const theme = useTheme();
  const breakpoint = landscape
    ? theme.theme?.breakpoints.md.value
    : theme.theme?.breakpoints.sm.value;
  return useMediaQuery(breakpoint as string, max);
};
