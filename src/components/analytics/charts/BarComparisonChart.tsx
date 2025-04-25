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
  const { theme } = useTheme();

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
        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.secondary} />
        <XAxis dataKey="category" stroke={theme.colors.secondary} tick={{ fill: theme.colors.secondary }} />
        <YAxis stroke={theme.colors.secondary} tick={{ fill: theme.colors.secondary }} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.secondary}`,
            borderRadius: '0.375rem',
          }}
          labelStyle={{ color: theme.colors.text }}
        />
        <Legend />
        <Bar dataKey="current" fill={theme.colors.primary} />
        <Bar dataKey="previous" fill={theme.colors.secondary} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarComparisonChart;