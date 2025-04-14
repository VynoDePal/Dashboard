import React, { useState } from 'react';
import { Search, BarChart2, Calendar, CheckSquare, Cloud, Globe, MessageSquare, Mail, FolderKanban, StickyNote } from 'lucide-react';
import { Widget } from '../../types/settings';
import { getWidgetConfig } from '../../utils/GetWidgetConfig';

const WidgetsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [widgets, setWidgets] = useState<Widget[]>(getWidgetConfig() as Widget[]);

  const categories = Array.from(new Set(widgets.map(w => w.category)));

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      BarChart2, Calendar, CheckSquare, Cloud, Globe, 
      MessageSquare, Mail, FolderKanban, StickyNote
    };
    return icons[iconName] || BarChart2;
  };

  const filteredWidgets = widgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || widget.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Widgets
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm capitalize whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWidgets.map(widget => {
          const IconComponent = getIconComponent(widget.icon);
          return (
            <div
              key={widget.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{widget.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {widget.category}
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={widget.enabled}
                    onChange={() => toggleWidget(widget.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWidgets.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No widgets found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default WidgetsManager;