import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPIStat } from '../../types/analytics';

interface KPIStatCardProps {
  stat: KPIStat;
}

const KPIStatCard: React.FC<KPIStatCardProps> = ({ stat }) => {
  const isPositive = stat.change >= 0;

  return (
    <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-6 transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:bg-secondary/10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase text-secondary font-medium">
          {stat.title}
        </h3>
        {stat.icon}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-text">
          {stat.value}
        </div>
        <div className="mt-2 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isPositive ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'
          }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1 text-secondary" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1 text-accent" />
            )}
            {Math.abs(stat.change)}%
          </span>
          <span className="ml-2 text-sm text-text opacity-70">
            vs previous period
          </span>
        </div>
      </div>
    </div>
  );
};

export default KPIStatCard;