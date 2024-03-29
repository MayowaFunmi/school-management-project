import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { IParent } from '../../../models/parentModels';
import { getParentProfile } from '../../../features/parentSlice';
import ParentDetails from './ParentDetails';
import ParentProfile from './ParentProfile';

const AddParentProfile: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { getParent, getMessage, getMsg } = useAppSelector((state) => state.parent);

  const [profileData, setProfileData] = useState<IParent | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getParentProfile(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (getMessage === "success") {
      setProfileData(getParent)
    }
  }, [getMessage, getParent])

  return (
    <div>
      {getMessage === "pending" ? (
        <p>{getMsg}</p>
      ) : (getMessage === "success" && profileData ? (
        <ParentDetails data={getParent} />
      ) : (getMessage === "success" && !profileData ? (
        <>
          <h2>Create parent profile</h2>
          <ParentProfile />
        </>
      ) : null
      )) }
    </div>
  )
}

export default AddParentProfile