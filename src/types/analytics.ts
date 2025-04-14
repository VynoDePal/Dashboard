import { ReactNode } from 'react';

export interface KPIStat {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
}

export interface ChartData {
  trendData: Array<{
    date: string;
    value: number;
  }>;
  comparisonData: Array<{
    category: string;
    current: number;
    previous: number;
  }>;
  distributionData: Array<{
    name: string;
    value: number;
  }>;
}

export interface PerformanceData {
  id: string;
  name: string;
  category: string;
  value: number;
  status: 'success' | 'warning' | 'error';
}

export interface TopPerformer {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  score: number;
}