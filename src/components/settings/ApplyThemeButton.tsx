import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Check, Loader2, Paintbrush, Undo2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../types/settings';

interface ApplyThemeButtonProps {
  newTheme: Theme;
  isValid?: boolean;
}

const ApplyThemeButton: React.FC<ApplyThemeButtonProps> = ({ newTheme, isValid = true }) => {
  const { updateTheme } = useTheme();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showUndo, setShowUndo] = useState(false);
  const previousTheme = useRef<Theme | null>(null);

  // Validate theme colors
  const validateTheme = useCallback((theme: Theme): boolean => {
    const isValidHex = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    
    return (
      isValidHex(theme.colors.primary) &&
      isValidHex(theme.colors.secondary) &&
      isValidHex(theme.colors.accent)
    );
  }, []);

  // Memoize the validation result
  const isThemeValid = useMemo(() => {
    return isValid && validateTheme(newTheme);
  }, [isValid, validateTheme, newTheme]);

  // Save theme to localStorage
  const persistTheme = useCallback((theme: Theme) => {
    try {
      localStorage.setItem('dashboard_theme', JSON.stringify(theme));
      return true;
    } catch (error) {
      console.error('Failed to persist theme:', error);
      return false;
    }
  }, []);

  const handleApplyTheme = async () => {
    if (!isThemeValid) {
      setStatus('error');
      setErrorMessage('Invalid theme configuration');
      return;
    }

    setStatus('loading');
    
    try {
      // Store current theme for undo
      previousTheme.current = JSON.parse(localStorage.getItem('dashboard_theme') || 'null');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update theme context
      updateTheme(newTheme);
      
      // Persist to localStorage
      if (!persistTheme(newTheme)) {
        throw new Error('Failed to save theme preferences');
      }

      setStatus('success');
      setShowUndo(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to apply theme');
    }
  };

  const handleUndo = async () => {
    if (!previousTheme.current) return;

    setStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateTheme(previousTheme.current);
      persistTheme(previousTheme.current);
      
      setStatus('success');
      setShowUndo(false);
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to restore previous theme');
    }
  };

  // Button states
  const buttonStates = {
    idle: {
      className: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      icon: <Paintbrush className="h-5 w-5" />,
      text: 'Apply Theme',
    },
    loading: {
      className: 'bg-blue-600 cursor-wait',
      icon: <Loader2 className="h-5 w-5 animate-spin" />,
      text: 'Applying...',
    },
    success: {
      className: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      icon: <Check className="h-5 w-5" />,
      text: 'Theme Applied',
    },
    error: {
      className: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      icon: <Paintbrush className="h-5 w-5" />,
      text: 'Try Again',
    },
  };

  const currentState = buttonStates[status];

  return (
    <div className="space-y-4">
      <button
        onClick={handleApplyTheme}
        disabled={!isThemeValid || status === 'loading'}
        className={`
          inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
          text-white font-medium transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${currentState.className}
        `}
        aria-label="Apply selected theme"
      >
        {currentState.icon}
        {currentState.text}
      </button>

      {/* Undo button */}
      {showUndo && status !== 'loading' && (
        <button
          onClick={handleUndo}
          className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg
            text-gray-700 dark:text-gray-200 font-medium
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label="Undo theme changes"
        >
          <Undo2 className="h-5 w-5" />
          Undo
        </button>
      )}

      {/* Error message */}
      {status === 'error' && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 rounded-lg px-4 py-2">
          {errorMessage}
        </div>
      )}

      {/* Success message */}
      {status === 'success' && (
        <div className="mt-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 rounded-lg px-4 py-2">
          Theme has been successfully applied!
        </div>
      )}
    </div>
  );
};

export default ApplyThemeButton;