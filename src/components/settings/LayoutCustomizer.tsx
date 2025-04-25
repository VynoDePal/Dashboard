import React, { useState } from 'react';
import { Grid, Layout as LayoutIcon, Maximize2, Minimize2 } from 'lucide-react';
import { LayoutTemplate } from '../../types/settings';

const LayoutCustomizer: React.FC = () => {
  const [layout, setLayout] = useState<LayoutTemplate['layout']>([
    ['analytics', 'calendar', 'tasks', 'weather'],
    ['news', 'chat', 'email', 'projects'],
    ['notes', null, null, null]
  ]);

  const [activeTemplate, setActiveTemplate] = useState('default');
  const [isDragging, setIsDragging] = useState(false);

  const templates: LayoutTemplate[] = [
    {
      id: 'default',
      name: 'Default',
      layout: [
        ['analytics', 'calendar', 'tasks', 'weather'],
        ['news', 'chat', 'email', 'projects'],
        ['notes', null, null, null]
      ]
    },
    {
      id: 'focus',
      name: 'Focus Mode',
      layout: [
        ['analytics', 'analytics', 'tasks', 'tasks'],
        ['calendar', 'email', 'email', 'projects'],
        [null, null, 'notes', 'notes']
      ]
    },
    {
      id: 'minimal',
      name: 'Minimal',
      layout: [
        ['analytics', null, null, null],
        ['calendar', 'tasks', null, null],
        ['email', null, null, null]
      ]
    }
  ];

  const handleDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    const widgetId = e.dataTransfer.getData('widget');
    
    // Remove widget from its previous position
    const newLayout = layout.map(row => [...row]);
    for (let r = 0; r < newLayout.length; r++) {
      for (let c = 0; c < newLayout[r].length; c++) {
        if (newLayout[r][c] === widgetId) {
          newLayout[r][c] = null;
        }
      }
    }
    
    // Place widget in new position
    newLayout[row][col] = widgetId;
    setLayout(newLayout);
    setIsDragging(false);
  };

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    e.dataTransfer.setData('widget', widgetId);
    setIsDragging(true);
  };

  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setLayout(template.layout);
      setActiveTemplate(templateId);
    }
  };

  const resetLayout = () => {
    setLayout(templates[0].layout);
    setActiveTemplate('default');
  };

  const getWidgetName = (id: string | null) => {
    if (!id) return '';
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-8">
      <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={resetLayout}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Reset Layout
            </button>

            <div className="relative">
              <select
                value={activeTemplate}
                onChange={(e) => applyTemplate(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} Layout
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <LayoutIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text">Layout Preview</h3>
            <div className="grid grid-cols-4 gap-4">
              {layout.map((row, rowIndex) => (
                row.map((widget, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                    onDragOver={(e) => e.preventDefault()}
                    className={`aspect-video rounded-lg border-2 ${
                      widget
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : 'border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
                    } ${isDragging ? 'hover:border-blue-500 dark:hover:border-blue-400' : ''}`}
                  >
                    {widget && (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, widget)}
                        className="h-full p-4 flex flex-col items-center justify-center cursor-move"
                      >
                        <Grid className="h-6 w-6 text-secondary mb-2" />
                        <span className="text-sm text-text">
                          {getWidgetName(widget)}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text">Layout Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  Widget Spacing
                  <select className="ml-2 px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                    <option>Compact</option>
                    <option>Comfortable</option>
                    <option>Spacious</option>
                  </select>
                </label>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  Widget Size
                  <select className="ml-2 px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </label>
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <Minimize2 className="h-4 w-4" />
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-6">
        <h3 className="text-lg font-medium text-text mb-4">Layout Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Drag & Drop</h4>
            <p className="text-sm text-blue-600 dark:text-blue-200">
              Drag widgets to rearrange them in the layout grid
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Templates</h4>
            <p className="text-sm text-green-600 dark:text-green-200">
              Try different templates to find your ideal setup
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Customize</h4>
            <p className="text-sm text-purple-600 dark:text-purple-200">
              Adjust spacing and size to match your preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutCustomizer;