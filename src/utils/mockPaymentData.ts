import { Payment } from '../types/payment';

const paymentMethods = [
  { type: 'card', label: 'Credit Card', last4: '4242' },
  { type: 'paypal', label: 'PayPal', email: 'user@example.com' },
  { type: 'transfer', label: 'Bank Transfer', account: '****1234' },
];

const customers = [
  { name: 'John Doe', email: 'john@example.com', initials: 'JD' },
  { name: 'Jane Smith', email: 'jane@example.com', initials: 'JS' },
  { name: 'Mike Johnson', email: 'mike@example.com', initials: 'MJ' },
  { name: 'Sarah Wilson', email: 'sarah@example.com', initials: 'SW' },
];

const statuses = ['successful', 'pending', 'failed'] as const;

export const generateMockPayments = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const method = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 1000) + 100;

    return {
      id: `payment-${i + 1}`,
      customer,
      amount,
      method,
      status,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
};