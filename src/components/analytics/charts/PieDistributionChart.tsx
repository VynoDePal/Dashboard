import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../../context/ThemeContext';

interface PieDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

const PieDistributionChart: React.FC<PieDistributionChartProps> = ({ data }) => {
  const { isDark } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
            borderRadius: '0.375rem',
          }}
          labelStyle={{ color: isDark ? '#F3F4F6' : '#111827' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieDistributionChart;