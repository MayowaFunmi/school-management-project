import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getTeacherProfile } from '../../../features/staffSlice';
import { TeachingStaff } from '../../../models/staffModel';
import TeacherProfile from './TeacherProfile';

const AddTeacherProfile: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { data, message, status } = useAppSelector((state) => state.staff);

  const [profileData, setProfileData] = useState<TeachingStaff | null>(null);

  useEffect(() => {
    const getTeacher = async() => {
      if (userId) {
        await dispatch(getTeacherProfile(userId))
      }
    }
    getTeacher()
  }, [dispatch, userId])

  useEffect(() => {
    if (status === "success") {
      setProfileData(data)
    }
  }, [data, status])

  return (
    <div>
      {profileData === null ? (
        <>
          <p>{message}</p>
          <h2>Create teacher profile</h2>
          <TeacherProfile />
        </>
      ) : (message)}
    </div>
  )
}

export default AddTeacherProfile