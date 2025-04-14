import React from 'react';
import { X } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarNavigationProps {
  sections: {
    id: string;
    name: string;
    icon: LucideIcon;
  }[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sections,
  activeSection,
  onSectionChange,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => {
                onSectionChange(section.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{section.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarNavigation;