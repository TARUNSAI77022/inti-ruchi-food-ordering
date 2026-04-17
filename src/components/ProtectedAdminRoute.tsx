import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  if (!token || !user) {
    console.log("No auth session found. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  // Use user.role from the stored object instead of decoding token
  console.log("Protected Route Check - User Role:", user.role);

  if (user.role !== 'admin') {
    console.warn("Unauthorized Role detected:", user.role, "- Redirecting to home...");
    return <Navigate to="/" replace />;
  }

  console.log("ADMIN ACCESS GRANTED to", window.location.pathname);
  return <>{children}</>;
};

export default ProtectedAdminRoute;
