import React, { useState } from 'react';
import { Search, BarChart2, Calendar, CheckSquare, Cloud, Globe, MessageSquare, Mail, FolderKanban, StickyNote } from 'lucide-react';
import { useWidgets } from '../../context/WidgetsContext';

const WidgetsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { widgets, toggleWidget } = useWidgets();

  const categories = Array.from(new Set(widgets.map(w => w.category)));

  const getIconComponent = (iconName: string): React.FC<React.SVGProps<SVGSVGElement>> => {
    const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-secondary" />
          </div>
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-2 rounded-lg border-secondary bg-background text-text focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border-2 ${
              activeCategory === 'all'
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-secondary bg-background text-text hover:border-primary'
            }`}
          >
            All Widgets
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm capitalize whitespace-nowrap border-2 ${
                activeCategory === category
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-secondary bg-background text-text hover:border-primary'
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
              className="bg-background text-text rounded-lg border-secondary shadow-md p-4 transform transition-all ease-in-out duration-300 hover:shadow-md hover:scale-[1.03]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text">{widget.name}</h3>
                    <p className="text-sm text-secondary">{widget.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-secondary capitalize">
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
                  <div className="w-11 h-6 border-2 border-secondary bg-secondary/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer dark:bg-secondary/50 dark:border-secondary peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWidgets.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-secondary" />
          <h3 className="mt-2 text-sm font-medium text-text">No widgets found</h3>
          <p className="mt-1 text-sm text-secondary">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default WidgetsManager;