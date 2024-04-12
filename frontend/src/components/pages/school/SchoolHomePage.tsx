import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getSchoolDetails } from '../../../features/schoolSlice';

const SchoolHomePage = () => {
  const { schoolId } = useParams();

  const dispatch = useAppDispatch()
  const { organizationSChool, orgSchMsg } = useAppSelector((state) => state.school)

  useEffect(() => {
    if (schoolId)
      dispatch(getSchoolDetails(schoolId))
  }, [dispatch, schoolId])
  return (
    <div>SchoolHomePage</div>
  )
}

export default SchoolHomePage