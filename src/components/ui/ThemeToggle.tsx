import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, theme, updateTheme } = useTheme();

  const handleToggle = () => {
    // Toggle dark class
    toggleTheme();
    // Update background and text CSS vars via theme context
    const newDark = !isDark;
    const newBackground = newDark ? '#1f2937' : '#ffffff';
    const newText = newDark ? '#f3f4f6' : '#111827';
    updateTheme({
      id: theme.id,
      name: theme.name,
      colors: {
        ...theme.colors,
        background: newBackground,
        text: newText,
      },
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gray-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;