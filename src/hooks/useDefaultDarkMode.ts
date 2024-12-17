import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLocalStorage } from './useLocalStorage';

export function useDefaultDarkMode() {
  const { setTheme } = useTheme();
  const [hasSetInitialTheme, setHasSetInitialTheme] = useLocalStorage('has-set-initial-theme', false);

  useEffect(() => {
    if (!hasSetInitialTheme) {
      setTheme('dark');
      setHasSetInitialTheme(true);
    }
  }, [hasSetInitialTheme, setHasSetInitialTheme, setTheme]);
}