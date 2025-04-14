import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      {/* Dashboard content */}
    </div>
  );
};

export default Dashboard;