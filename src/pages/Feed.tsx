import React from 'react';
import { Outlet } from 'react-router-dom';
import FeedPage from '../components/feed/FeedPage';

const Feed: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <FeedPage />
      <Outlet />
    </div>
  );
};

export default Feed;