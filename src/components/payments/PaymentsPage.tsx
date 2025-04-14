import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PaymentsSummary from './PaymentsSummary';
import PaymentFilters from './PaymentFilters';
import PaymentsTable from './PaymentsTable';
import PaymentModal from './PaymentModal';
import { generateMockPayments } from '../../utils/mockPaymentData';

const PaymentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payments] = useState(generateMockPayments(50));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Payments
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Payment
        </button>
      </div>

      <PaymentsSummary payments={payments} />
      <PaymentFilters />
      <PaymentsTable payments={payments} />

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Floating action button for mobile */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 md:hidden p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default PaymentsPage;