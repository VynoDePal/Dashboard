import React from 'react';

interface UserTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'recent', label: 'Recently Joined' },
    { id: 'active', label: 'Most Active' },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="User categories">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default UserTabs;