import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmailLayout from '../components/email/EmailLayout';

const Email: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/*" element={<EmailLayout />}>
          <Route path=":emailId" element={null} />
          <Route path="new" element={null} />
        </Route>
      </Routes>
    </div>
  );
};

export default Email;