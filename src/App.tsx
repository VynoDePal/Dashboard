import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import DashboardLayout from './components/layout/DashboardLayout';
import { AuthGuard } from './guards/AuthGuard';
import { routes } from './routes';
import ErrorPage from './pages/ErrorPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            <Route element={<DashboardLayout />}>
              {/* Dashboard routes */}
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      {route.element}
                    </React.Suspense>
                  }
                />
              ))}
            </Route>
          </Route>

          {/* Error routes */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;