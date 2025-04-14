import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Simulated authentication check - replace with actual auth logic
const isAuthenticated = true;

export const AuthGuard: React.FC = () => {
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
};