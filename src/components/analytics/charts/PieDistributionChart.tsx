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

const PieDistributionChart: React.FC<PieDistributionChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const COLORS = [theme.colors.primary, theme.colors.secondary, theme.colors.accent];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill={theme.colors.primary}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.secondary}`,
            borderRadius: '0.375rem',
          }}
          labelStyle={{ color: theme.colors.text }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieDistributionChart;