import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import KPIStats from './KPIStats';
import ChartsSection from './ChartsSection';
import PerformanceTable from './PerformanceTable';
import TopPerformers from './TopPerformers';
import { mockKPIData, mockChartData, mockTableData, mockTopPerformers } from '../../utils/mockAnalyticsData';

const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'custom'>('7d');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  return (
    <div className="space-y-6 text-text">
      <HeaderSection
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      
      <KPIStats stats={mockKPIData} />
      
      <ChartsSection data={mockChartData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceTable data={mockTableData} />
        </div>
        <div>
          <TopPerformers data={mockTopPerformers} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;