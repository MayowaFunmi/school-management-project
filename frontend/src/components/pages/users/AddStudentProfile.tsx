import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { IStudent } from '../../../models/studentModel';
import { getStudentProfile } from '../../../features/studentSlice';
import StudentDetails from './StudentDetails';
import StudentProfile from './StudentProfile';

const AddStudentProfile: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { studentData, getMessage, getMsg } = useAppSelector((state) => state.student);

  const [profileData, setProfileData] = useState<IStudent | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getStudentProfile(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (getMessage === "success") {
      setProfileData(studentData)
    }
  }, [getMessage, studentData])

  return (
    <div>
      {getMessage === "pending" ? (
        <p>{getMsg}</p>
      ) : (getMessage === "success" && profileData ? (
        <StudentDetails data={studentData} />
      ) : (getMessage === "success" && !profileData ? (
        <>
          <h2>Create student profile</h2>
          <StudentProfile />
        </>
      ) : null
      )) }
    </div>
  )
}

export default AddStudentProfile