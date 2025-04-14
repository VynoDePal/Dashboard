import React from 'react';
import { User as UserIcon, Award } from 'lucide-react';
import { TopPerformer } from '../../types/analytics';

interface TopPerformersProps {
  data: TopPerformer[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Top Performers
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {data.map((performer, index) => (
            <div
              key={performer.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-shrink-0">
                {performer.avatar ? (
                  <img
                    src={performer.avatar}
                    alt={performer.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {performer.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {performer.role}
                </p>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;