import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        return <Navigate to="/" />;
      }
    }
    checkAuth();
  }, [isAuthenticated])

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile