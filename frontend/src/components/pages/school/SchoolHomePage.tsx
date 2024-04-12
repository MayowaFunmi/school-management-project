import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getSchoolDetails, getSchoolNonTeachersCount, getSchoolParentsCount, getSchoolStudentsCount, getSchoolTeachersCount } from '../../../features/schoolSlice';

const SchoolHomePage = () => {
  const { schoolId } = useParams();

  const dispatch = useAppDispatch()
  const { 
    organizationSChool,
    orgSchMsg,
    teachersCount, teachersCountMsg,
    nonTeachersCount, nonTeachersCountMsg,
    parentsCount, parentsCountMsg,
    studentsCount, studentsCountMsg
  } = useAppSelector((state) => state.school)

  useEffect(() => {
    if (schoolId)
      dispatch(getSchoolDetails(schoolId))
  }, [dispatch, schoolId])

  useEffect(() => {
    if (schoolId)
      dispatch(getSchoolTeachersCount(schoolId))
  }, [dispatch, schoolId])

  useEffect(() => {
    if (schoolId)
      dispatch(getSchoolNonTeachersCount(schoolId))
  }, [dispatch, schoolId])

  useEffect(() => {
    if (schoolId)
      dispatch(getSchoolParentsCount(schoolId))
  }, [dispatch, schoolId])

  useEffect(() => {
    if (schoolId)
      dispatch(getSchoolStudentsCount(schoolId))
  }, [dispatch, schoolId])

  return (
    <div className="container">
      {orgSchMsg === "success" && (
        <>
          <h1>{organizationSChool?.name}</h1>
          <small>{organizationSChool?.address}</small>
        </>
      )}
      <hr />
      <hr />
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="card-text">{studentsCountMsg === "success" && studentsCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Teaching Staff</h5>
              <p className="card-text">{teachersCountMsg === "success" && teachersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Non-Teaching Staff</h5>
              <p className="card-text">{nonTeachersCountMsg === "success" && nonTeachersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Parents</h5>
              <p className="card-text">{parentsCountMsg === "success" && parentsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolHomePage