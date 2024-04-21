import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import AddTeacherProfile from './users/AddTeacherProfile';
import AddNonTeacherProfile from './users/AddNonTeacherProfile';
import AddStudentProfile from './users/AddStudentProfile';
import AddParentProfile from './users/AddParentProfile';
import { useNavigate } from 'react-router-dom';

const CheckUserStatus: React.FC = () => {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isNonTeachingStaffExists,
    isParentExists,
    isStudentExists,
    isTeachingStaffExists,
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      {isAuthenticated && isTeachingStaffExists && <AddTeacherProfile />}
      {isAuthenticated && isNonTeachingStaffExists && <AddNonTeacherProfile />}
      {isAuthenticated && isStudentExists && <AddStudentProfile />}
      {isAuthenticated && isParentExists && <AddParentProfile />}
    </div>
  )
}

export default CheckUserStatus