import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPIStat } from '../../types/analytics';

interface KPIStatCardProps {
  stat: KPIStat;
}

const KPIStatCard: React.FC<KPIStatCardProps> = ({ stat }) => {
  const isPositive = stat.change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium">
          {stat.title}
        </h3>
        {stat.icon}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {stat.value}
        </div>
        <div className="mt-2 flex items-center">
          <span
            className={`inline-flex items-center text-sm ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {Math.abs(stat.change)}%
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            vs previous period
          </span>
        </div>
      </div>
    </div>
  );
};

export default KPIStatCard;