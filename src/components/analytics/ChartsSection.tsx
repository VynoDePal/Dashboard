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
    <div className="space-y-6 text-text">
      <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-4 hover:bg-secondary/10">
        <h3 className="text-lg font-medium text-secondary mb-4">
          Trend Analysis
        </h3>
        <div className="h-[300px]">
          <TrendLineChart data={data.trendData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-4 hover:bg-secondary/10">
          <h3 className="text-lg font-medium text-secondary mb-4">
            Category Comparison
          </h3>
          <div className="h-[300px]">
            <BarComparisonChart data={data.comparisonData} />
          </div>
        </div>

        <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-4 hover:bg-secondary/10">
          <h3 className="text-lg font-medium text-secondary mb-4">
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