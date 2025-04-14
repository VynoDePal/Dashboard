import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface SidebarWidgetProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  zIndex?: number;
  onClose: () => void;
}

const SidebarWidget: React.FC<SidebarWidgetProps> = ({
  title,
  description,
  children,
  isOpen,
  zIndex = 100,
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { trapFocus, releaseFocus } = useFocusTrap(panelRef);

  useEffect(() => {
    if (isOpen) {
      trapFocus();
    } else {
      releaseFocus();
    }
  }, [isOpen, trapFocus, releaseFocus]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby={`widget-title-${title}`}
      aria-modal="true"
      className={`
        fixed top-0 right-0 h-full
        w-full sm:w-96 md:max-w-md
        bg-white dark:bg-gray-900
        shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      style={{ zIndex }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2
              id={`widget-title-${title}`}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Close widget"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SidebarWidget;