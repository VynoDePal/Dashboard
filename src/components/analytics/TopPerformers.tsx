import React from 'react';
import { User as UserIcon, Award } from 'lucide-react';
import { TopPerformer } from '../../types/analytics';

interface TopPerformersProps {
  data: TopPerformer[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ data }) => {
  return (
    <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm">
      <div className="p-4 border-b-2 border-secondary">
        <h3 className="text-lg font-medium text-secondary">
          Top Performers
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-4">
          {data.map((performer, index) => (
            <div
              key={performer.id}
              className="flex items-center space-x-4 p-4 bg-background rounded-lg border-2 border-secondary transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:bg-secondary/10"
            >
              <div className="flex-shrink-0">
                {performer.avatar ? (
                  <img
                    src={performer.avatar}
                    alt={performer.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-secondary" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">
                  {performer.name}
                </p>
                <p className="text-sm text-text/70">
                  {performer.role}
                </p>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-accent mr-1" />
                <span className="text-sm font-medium text-text">
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