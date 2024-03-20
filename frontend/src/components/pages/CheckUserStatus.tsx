import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import AddTeacherProfile from './users/AddTeacherProfile';

const CheckUserStatus: React.FC = () => {
  const {
    isAuthenticated,
    isSuperAdminRoleExists,
    isAdminRoleExists,
    isNonTeachingStaffExists,
    isOrganizationAdminExists,
    isOwnerExists,
    isParentExists,
    isStudentExists,
    isTeachingStaffExists,
  } = useAuth();

  return (
    <div>
      {isAuthenticated && isTeachingStaffExists && <AddTeacherProfile />}
    </div>
  )
}

export default CheckUserStatus