import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../../context/ThemeContext';

interface TrendLineChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

const TrendLineChart: React.FC<TrendLineChartProps> = ({ data }) => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.secondary} />
        <XAxis dataKey="date" stroke={theme.colors.secondary} tick={{ fill: theme.colors.secondary }} />
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
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.colors.primary}
          strokeWidth={2}
          dot={{ fill: theme.colors.primary, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendLineChart;