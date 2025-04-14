export type PaymentStatus = 'successful' | 'pending' | 'failed';
export type PaymentMethod = 'card' | 'paypal' | 'transfer';

export interface Payment {
  id: string;
  customer: {
    name: string;
    email: string;
    initials: string;
  };
  amount: number;
  method: {
    type: PaymentMethod;
    label: string;
    last4?: string;
    email?: string;
    account?: string;
  };
  status: PaymentStatus;
  date: string;
}