import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-background text-text">
      {/* Mobile Sidebar overlay with animation */}
      <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Overlay backdrop */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        {/* Sidebar drawer */}
        <div
          className={`relative w-60 h-full bg-background text-text border-r-2 border-secondary transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar forceExpanded onNavigate={() => setIsSidebarOpen(false)} />
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
