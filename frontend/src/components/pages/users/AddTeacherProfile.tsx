import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getTeacherProfile } from '../../../features/staffSlice';
import { TeachingStaff } from '../../../models/staffModel';
import TeacherProfile from './TeacherProfile';
import TeacherDetails from './TeacherDetails';

const AddTeacherProfile: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { data, message, status } = useAppSelector((state) => state.staff);

  const [profileData, setProfileData] = useState<TeachingStaff | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getTeacherProfile(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (status === "success") {
      setProfileData(data)
    }
  }, [data, status])

  return (
    <div>
      {/* {profileData ? (
        <TeacherDetails data={data} />
      ) : (
        <>
          <p>{message}</p>
          <h2>Create teacher profile</h2>
          <TeacherProfile />
        </>
      )} */}

      {status === "pending" ? (
        <p>{message}</p>
      ) : (status === "success" && profileData ? (
        <TeacherDetails data={data} />
      ) : (status === "success" && !profileData ? (
        <>
          <h2>Create teaching staff profile</h2>
          <TeacherProfile />
        </>
      ) : null
      )) }
    </div>
  )
}


export default AddTeacherProfile