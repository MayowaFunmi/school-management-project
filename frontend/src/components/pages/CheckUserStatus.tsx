import React from 'react'
import { useAuth } from '../../context/AuthContext';
import AddTeacherProfile from './users/AddTeacherProfile';
import AddNonTeacherProfile from './users/AddNonTeacherProfile';
import AddStudentProfile from './users/AddStudentProfile';
import AddParentProfile from './users/AddParentProfile';

const CheckUserStatus: React.FC = () => {
  const {
    isAuthenticated,
    isNonTeachingStaffExists,
    isParentExists,
    isStudentExists,
    isTeachingStaffExists,
  } = useAuth();

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