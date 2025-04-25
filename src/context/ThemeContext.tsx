import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types/settings';

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  theme: Theme
  updateTheme: (theme: Theme) => void
}

const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#111827',
  },
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  theme: defaultTheme,
  updateTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('dashboard_theme')
    return saved ? JSON.parse(saved) : defaultTheme
  })

  useEffect(() => {
    // Toggle dark mode class
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    // Apply all theme colors as CSS variables
    document.documentElement.style.setProperty('--color-primary', theme.colors.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.colors.secondary)
    document.documentElement.style.setProperty('--color-accent', theme.colors.accent)
    // Background and text adapt to dark mode for default theme
    document.documentElement.style.setProperty(
      '--color-background',
      theme.id === 'default'
        ? (isDark ? '#1f2937' : defaultTheme.colors.background)
        : theme.colors.background
    )
    document.documentElement.style.setProperty(
      '--color-text',
      theme.id === 'default'
        ? (isDark ? '#f3f4f6' : defaultTheme.colors.text)
        : theme.colors.text
    )

    // Persist theme object
    localStorage.setItem('dashboard_theme', JSON.stringify(theme))
  }, [isDark, theme])

  const toggleTheme = () => setIsDark(!isDark);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;