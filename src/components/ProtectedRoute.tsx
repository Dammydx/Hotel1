import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    return <Navigate to="/adminlogin" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
