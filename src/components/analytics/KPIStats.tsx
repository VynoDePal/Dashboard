import React from 'react';
import KPIStatCard from './KPIStatCard';
import { KPIStat } from '../../types/analytics';

interface KPIStatsProps {
  stats: KPIStat[];
}

const KPIStats: React.FC<KPIStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <KPIStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default KPIStats;