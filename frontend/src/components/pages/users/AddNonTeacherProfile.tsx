import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { useAuth } from '../../../context/AuthContext';
import { NonTeachingStaff } from '../../../models/staffModel';
import { getNonTeacherProfile } from '../../../features/staffSlice';
import NonTeacherDetails from './NonTeacherDetails';
import NonTeacherProfile from './NonTeacherProfile';

const AddNonTeacherProfile: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { staffData, staffMessage, staffStatus } = useAppSelector((state) => state.staff);

  const [profileData, setProfileData] = useState<NonTeachingStaff | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getNonTeacherProfile(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (staffStatus === "success") {
      setProfileData(staffData)
    }
  }, [staffData, staffStatus])

  return (
    <div className='container'>
      {/* {profileData ? (
        <NonTeacherDetails data={staffData} />
      ) : (
        <>
          <p>{staffMessage}</p>
          <h2>Create staff profile</h2>
          <NonTeacherProfile />
        </>
      )} */}

      {staffStatus === "pending" ? (
        <p>{staffMessage}</p>
      ) : (staffStatus === "success" && profileData ? (
        <NonTeacherDetails data={staffData} />
      ) : (staffStatus === "success" && !profileData ? (
        <>
          <h2>Create non-teaching staff profile</h2>
          <NonTeacherProfile />
        </>
      ) : null
      )) }
    </div>
  )
}

export default AddNonTeacherProfile