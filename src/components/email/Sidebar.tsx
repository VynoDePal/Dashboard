import React from 'react';
import { X, Plus, Inbox, Send, Archive, Trash2, Star, Tag, Settings } from 'lucide-react';

interface SidebarProps {
  onNewEmail: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewEmail, onClose }) => {
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 12 },
    { id: 'sent', name: 'Sent', icon: Send },
    { id: 'drafts', name: 'Drafts', icon: Archive, count: 3 },
    { id: 'trash', name: 'Trash', icon: Trash2 },
  ];

  const labels = [
    { id: 'important', name: 'Important', color: 'text-yellow-500' },
    { id: 'work', name: 'Work', color: 'text-blue-500' },
    { id: 'personal', name: 'Personal', color: 'text-green-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={onNewEmail}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Message
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Folders
            </h3>
            <ul className="space-y-1">
              {folders.map(folder => {
                const Icon = folder.icon;
                return (
                  <li key={folder.id}>
                    <button
                      className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="flex-1 text-left">{folder.name}</span>
                      {folder.count && (
                        <span className="ml-auto bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded-full">
                          {folder.count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Labels
            </h3>
            <ul className="space-y-1">
              {labels.map(label => (
                <li key={label.id}>
                  <button
                    className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Tag className={`w-5 h-5 mr-3 ${label.color}`} />
                    <span className="flex-1 text-left">{label.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;