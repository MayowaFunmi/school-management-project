import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';

const HomeContainer: React.FC = () => {
  const navigate = useNavigate();

  const {
    isAuthenticated
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])
  return (
    <div className='container'>
      <h3>Welcome to my site.</h3>
      <Link to="/check-user-status">Go to your profile page</Link>
    </div>
  )
}

export default HomeContainer