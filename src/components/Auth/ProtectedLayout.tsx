import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ProgressProvider } from '../../context/ProgressContext';
import { Header } from '../Layout/Header';
import { Sidebar } from '../Layout/Sidebar';
import { useAuth } from '../../context/AuthContext';

export function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Verifica sessione...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-slate-50">
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <main className="flex-1 p-3 sm:p-6 overflow-y-auto lg:ml-0 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]">
            <Outlet />
          </main>
        </div>
      </div>
    </ProgressProvider>
  );
}
