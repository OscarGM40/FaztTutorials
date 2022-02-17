import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  //  if (!user) return <Navigate to="/login" replace />;
  //  if(loading) return <p>Loading...</p>; 

  return <>{children}</>;
}

export default ProtectedRoute 