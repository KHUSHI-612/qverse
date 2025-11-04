import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--bg', '#0b0f14');
    root.style.setProperty('--panel', '#0f141b');
    root.style.setProperty('--text', '#e6f0ff');
    root.style.setProperty('--muted', '#9fb3c8');
    root.style.setProperty('--accent', '#2b6cb0'); /* blue */
    root.style.setProperty('--accent-contrast', '#e6f0ff');
    root.style.setProperty('--input', '#121823');
    root.style.setProperty('--border', '#203042');
  } else {
    root.style.setProperty('--bg', '#f6f9ff');
    root.style.setProperty('--panel', '#ffffff');
    root.style.setProperty('--text', '#0b0f14');
    root.style.setProperty('--muted', '#516173');
    root.style.setProperty('--accent', '#1e5aa7');
    root.style.setProperty('--accent-contrast', '#ffffff');
    root.style.setProperty('--input', '#f2f6fb');
    root.style.setProperty('--border', '#d7e1ee');
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('qverse_theme') || 'dark');

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('qverse_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}


