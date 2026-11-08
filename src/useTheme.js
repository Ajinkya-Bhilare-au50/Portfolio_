import { useEffect, useState } from 'react';

const getInitialTheme = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

// Theme state synced to <html class="dark"> and localStorage.
// The initial value is set before paint by the inline script in index.html.
export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggleTheme };
};
