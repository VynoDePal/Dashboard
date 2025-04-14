import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../../context/ThemeContext';

interface BarComparisonChartProps {
  data: Array<{
    category: string;
    current: number;
    previous: number;
  }>;
}

const BarComparisonChart: React.FC<BarComparisonChartProps> = ({ data }) => {
  const { isDark } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? '#374151' : '#e5e7eb'}
        />
        <XAxis
          dataKey="category"
          stroke={isDark ? '#9CA3AF' : '#6B7280'}
          tick={{ fill: isDark ? '#9CA3AF' : '#6B7280' }}
        />
        <YAxis
          stroke={isDark ? '#9CA3AF' : '#6B7280'}
          tick={{ fill: isDark ? '#9CA3AF' : '#6B7280' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
            borderRadius: '0.375rem',
          }}
          labelStyle={{ color: isDark ? '#F3F4F6' : '#111827' }}
        />
        <Legend />
        <Bar dataKey="current" fill="#3B82F6" />
        <Bar dataKey="previous" fill="#93C5FD" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarComparisonChart;