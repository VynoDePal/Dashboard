import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Widget } from '../../types/settings';
import SidebarWidget from './SidebarWidget';

interface SidebarWidgetContainerProps {
  widgets: Widget[];
  children: React.ReactNode;
}

interface OpenWidget {
  id: string;
  zIndex: number;
}

const SidebarWidgetContainer: React.FC<SidebarWidgetContainerProps> = ({ widgets, children }) => {
  const [openWidgets, setOpenWidgets] = useState<OpenWidget[]>([]);
  const baseZIndex = 100;

  const handleOpen = useCallback((widgetId: string) => {
    setOpenWidgets(prev => {
      // If widget is already open, bring it to front
      if (prev.find(w => w.id === widgetId)) {
        return prev.map(w => 
          w.id === widgetId 
            ? { ...w, zIndex: baseZIndex + prev.length } 
            : w
        );
      }
      // Add new widget with highest z-index
      return [...prev, { id: widgetId, zIndex: baseZIndex + prev.length }];
    });
  }, []);

  const handleClose = useCallback((widgetId: string) => {
    setOpenWidgets(prev => prev.filter(w => w.id !== widgetId));
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openWidgets.length > 0) {
        const lastWidget = openWidgets[openWidgets.length - 1];
        handleClose(lastWidget.id);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openWidgets, handleClose]);

  // Create portal container if it doesn't exist
  useEffect(() => {
    if (!document.getElementById('widget-portal')) {
      const portalDiv = document.createElement('div');
      portalDiv.id = 'widget-portal';
      document.body.appendChild(portalDiv);
    }
  }, []);

  return (
    <>
      {/* Main content with widget triggers */}
      <div className="relative">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onOpenWidget: handleOpen
            });
          }
          return child;
        })}
      </div>

      {/* Widget portal */}
      {createPortal(
        <>
          {/* Backdrop when any widget is open */}
          {openWidgets.length > 0 && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              style={{ zIndex: baseZIndex - 1 }}
              onClick={() => handleClose(openWidgets[openWidgets.length - 1].id)}
            />
          )}

          {/* Widgets */}
          {widgets.map(widget => {
            const openWidget = openWidgets.find(w => w.id === widget.id);
            return (
              <SidebarWidget
                key={widget.id}
                isOpen={Boolean(openWidget)}
                title={widget.name}
                description={widget.description}
                zIndex={openWidget?.zIndex}
                onClose={() => handleClose(widget.id)}
              >
                {/* Widget content would go here */}
                <div className="p-4">
                  <h3 className="text-lg font-medium">{widget.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{widget.description}</p>
                </div>
              </SidebarWidget>
            );
          })}
        </>,
        document.getElementById('widget-portal') || document.body
      )}
    </>
  );
};

export default SidebarWidgetContainer;