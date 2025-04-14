import React from 'react';
import TrendLineChart from './charts/TrendLineChart';
import BarComparisonChart from './charts/BarComparisonChart';
import PieDistributionChart from './charts/PieDistributionChart';
import { ChartData } from '../../types/analytics';

interface ChartsSectionProps {
  data: ChartData;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Trend Analysis
        </h3>
        <div className="h-[300px]">
          <TrendLineChart data={data.trendData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Category Comparison
          </h3>
          <div className="h-[300px]">
            <BarComparisonChart data={data.comparisonData} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Distribution
          </h3>
          <div className="h-[300px]">
            <PieDistributionChart data={data.distributionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;