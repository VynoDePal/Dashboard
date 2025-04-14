import { useCallback, useRef } from 'react';

export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>) => {
  const focusableElements = useRef<HTMLElement[]>([]);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }, [containerRef]);

  const trapFocus = useCallback(() => {
    focusableElements.current = getFocusableElements();
    
    if (focusableElements.current.length === 0) return;

    const firstElement = focusableElements.current[0];
    const lastElement = focusableElements.current[focusableElements.current.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [getFocusableElements]);

  const releaseFocus = useCallback(() => {
    focusableElements.current = [];
  }, []);

  return { trapFocus, releaseFocus };
};