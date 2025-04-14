import React from 'react';
import { DollarSign, Clock, RefreshCcw, TrendingUp } from 'lucide-react';

interface PaymentsSummaryProps {
  payments: any[];
}

const PaymentsSummary: React.FC<PaymentsSummaryProps> = ({ payments }) => {
  const summaryCards = [
    {
      title: 'Total Received',
      value: '$24,500.00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Pending Amount',
      value: '$4,200.00',
      change: '+5.2%',
      icon: Clock,
      color: 'text-yellow-500',
    },
    {
      title: 'Total Refunded',
      value: '$1,240.00',
      change: '-2.4%',
      icon: RefreshCcw,
      color: 'text-red-500',
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '+0.5%',
      icon: TrendingUp,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${card.color} bg-opacity-10`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <span
              className={`text-sm font-medium ${
                card.change.startsWith('+')
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {card.change}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {card.value}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PaymentsSummary;