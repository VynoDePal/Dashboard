import React from 'react';
import { Activity, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { KPIStat, ChartData, PerformanceData, TopPerformer } from '../types/analytics';

export const mockKPIData: KPIStat[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$24,567',
    change: 8.2,
    icon: DollarSign ? React.createElement(DollarSign, { className: "h-6 w-6 text-green-500" }) : null,
  },
  {
    id: '2',
    title: 'Active Users',
    value: '12,345',
    change: 12.5,
    icon: Users ? React.createElement(Users, { className: "h-6 w-6 text-blue-500" }) : null,
  },
  {
    id: '3',
    title: 'Orders',
    value: '1,234',
    change: -2.4,
    icon: ShoppingCart ? React.createElement(ShoppingCart, { className: "h-6 w-6 text-purple-500" }) : null,
  },
  {
    id: '4',
    title: 'Conversion Rate',
    value: '2.4%',
    change: 4.1,
    icon: Activity ? React.createElement(Activity, { className: "h-6 w-6 text-orange-500" }) : null,
  },
];

export const mockChartData: ChartData = {
  trendData: [
    { date: '2024-01', value: 4000 },
    { date: '2024-02', value: 3000 },
    { date: '2024-03', value: 2000 },
    { date: '2024-04', value: 2780 },
    { date: '2024-05', value: 1890 },
    { date: '2024-06', value: 2390 },
    { date: '2024-07', value: 3490 },
  ],
  comparisonData: [
    { category: 'A', current: 4000, previous: 2400 },
    { category: 'B', current: 3000, previous: 1398 },
    { category: 'C', current: 2000, previous: 9800 },
    { category: 'D', current: 2780, previous: 3908 },
    { category: 'E', current: 1890, previous: 4800 },
  ],
  distributionData: [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
    { name: 'Category E', value: 100 },
  ],
};

export const mockTableData: PerformanceData[] = [
  {
    id: '1',
    name: 'Product A',
    category: 'Electronics',
    value: 1234,
    status: 'success',
  },
  {
    id: '2',
    name: 'Product B',
    category: 'Clothing',
    value: 856,
    status: 'warning',
  },
  {
    id: '3',
    name: 'Product C',
    category: 'Food',
    value: 654,
    status: 'error',
  },
  {
    id: '4',
    name: 'Product D',
    category: 'Electronics',
    value: 1432,
    status: 'success',
  },
  {
    id: '5',
    name: 'Product E',
    category: 'Clothing',
    value: 987,
    status: 'warning',
  },
];

export const mockTopPerformers: TopPerformer[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Sales Manager',
    avatar: 'https://i.pravatar.cc/150?u=john',
    score: 98,
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Marketing Lead',
    avatar: 'https://i.pravatar.cc/150?u=jane',
    score: 95,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?u=mike',
    score: 92,
  },
];