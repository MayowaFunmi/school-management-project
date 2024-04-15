import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { 
  clearSchoolUsers,
  getSchoolDetails,
  getSchoolNonTeachersCount,
  getSchoolParentsCount,
  getSchoolStudentsCount,
  getSchoolTeachersCount,
  nonTeachersInSchool,
  parentsInSchool,
  studentsInSchool,
  teachersInSchool 
} from '../../../features/schoolSlice';

import { UserList } from '../../../models/userModel';
import store from '../../../store/store';
import ProfileImage from '../../images/ProfileImage';
import { NonTeachingStaff, TeachingStaff } from '../../../models/staffModel';
import { IParent } from '../../../models/parentModels';
import { IStudent } from '../../../models/studentModel';

const SchoolHomePage = () => {
  const { schoolId } = useParams();
  const pageSize = 3;

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const { 
    organizationSChool,
    orgSchMsg,
    teachersCount, teachersCountMsg,
    nonTeachersCount, nonTeachersCountMsg,
    parentsCount, parentsCountMsg,
    studentsCount, studentsCountMsg,
    teachersList, teachersListMsg,
    nonTeachersList, nonTeachersListMsg,
    parentsList, parentsListMsg,
    studentsList, studentsListMsg,
    tCurrentPage, tTotalPages,
    nCurrentPage, nTotalPages,
    pCurrentPage, pTotalPages,
    sCurrentPage, sTotalPages
  } = useAppSelector((state) => state.school)

  const handleViewDetails = (user: TeachingStaff) => {
    store.dispatch(clearSchoolUsers())
    navigate('/teacher-details', { state: { user }})
  }

  const handleViewStaffDetails = (user: NonTeachingStaff) => {
    store.dispatch(clearSchoolUsers())
    navigate('/non-teacher-details', { state: { user }})
  }

  const handleViewParentDetails = (user: IParent) => {
    store.dispatch(clearSchoolUsers())
    navigate('/parent-details', { state: { user }})
  }

  const handleViewStudentDetails = (user: IStudent) => {
    store.dispatch(clearSchoolUsers())
    navigate('/student-details', { state: { user }})
  }

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

  type UserType = 'Teacher' | 'NonTeacher' | 'Parent' | 'Student';

  const getUserList = (userType: UserType) => {
    if (schoolId) {
      store.dispatch(clearSchoolUsers())
      const userData: UserList = { schoolId, page: 1, pageSize }
      dispatch(userType === 'Teacher' ? teachersInSchool(userData) : 
        userType === 'NonTeacher' ? nonTeachersInSchool(userData) :
        userType === 'Parent' ? parentsInSchool(userData) :
        studentsInSchool(userData))
      }
  }

  const teacherPages = (option: string) => {
    if (schoolId) {
      if (option === "previous") {
        dispatch(teachersInSchool({ schoolId, page: tCurrentPage - 1, pageSize }))
      } else {
        dispatch(teachersInSchool({ schoolId, page: tCurrentPage + 1, pageSize }))
      }
    }
  }

  const nonTeacherPages = (option: string) => {
    if (schoolId) {
      if (option === "previous") {
        dispatch(nonTeachersInSchool({ schoolId, page: tCurrentPage - 1, pageSize }))
      } else {
        dispatch(nonTeachersInSchool({ schoolId, page: tCurrentPage + 1, pageSize }))
      }
    }
  }

  const parentPages = (option: string) => {
    if (schoolId) {
      if (option === "previous") {
        dispatch(parentsInSchool({ schoolId, page: tCurrentPage - 1, pageSize }))
      } else {
        dispatch(parentsInSchool({ schoolId, page: tCurrentPage + 1, pageSize }))
      }
    }
  }

  const studentPages = (option: string) => {
    if (schoolId) {
      if (option === "previous") {
        dispatch(studentsInSchool({ schoolId, page: tCurrentPage - 1, pageSize }))
      } else {
        dispatch(studentsInSchool({ schoolId, page: tCurrentPage + 1, pageSize }))
      }
    }
  }

  return (
    <>
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
            <div className="card" onClick={() => getUserList('Student')} style={{ cursor: "pointer"}}>
              <div className="card-body">
                <h5 className="card-title">Students</h5>
                <p className="card-text">{studentsCountMsg === "success" && studentsCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" onClick={() => getUserList('Teacher')} style={{ cursor: "pointer"}}>
              <div className="card-body">
                <h5 className="card-title">Teaching Staff</h5>
                <p className="card-text">{teachersCountMsg === "success" && teachersCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" onClick={() => getUserList('NonTeacher')} style={{ cursor: "pointer"}}>
              <div className="card-body">
                <h5 className="card-title">Non-Teaching Staff</h5>
                <p className="card-text">{nonTeachersCountMsg === "success" && nonTeachersCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" onClick={() => getUserList('Parent')} style={{ cursor: "pointer"}}>
              <div className="card-body">
                <h5 className="card-title">Parents</h5>
                <p className="card-text">{parentsCountMsg === "success" && parentsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <hr />

      {(teachersListMsg === "pending" || nonTeachersListMsg === "pending" || parentsListMsg === "pending" || studentsListMsg === "pending") && (
        <p><i>getting users list, please wait ...</i></p>
      )}

      {teachersListMsg === "success" && (
        <>
          {teachersList?.map((teacher) => (
            <div key={teacher.userId}>
              <div className="card">
                {teacher.profilePicture ? (
                  <ProfileImage imageUrl={teacher.profilePicture} size='100px' borderRadius="50%" classVal="card-img-top" />
                ) : (
                  teacher.gender === "Male" ? (
                  <>
                    <ProfileImage imageUrl="/male_avatar.jpeg" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  ) : (
                  <>
                    <ProfileImage imageUrl="female_avatar.png" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  )
                )}
                <div className="card-body">
                  <h5 className="card-title">Name: {teacher.user.lastName} {teacher.user.firstName}</h5>
                  <p className="card-text">Phone Number: {teacher.user.phoneNumber}</p>
                  <div>
                  <button className='btn btn-info' onClick={() => handleViewDetails(teacher)}>
                    View Details
                  </button>
                </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      )}

      {teachersList.length !== 0 && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button className='btn btn-info' onClick={() => teacherPages("previous")} disabled={tCurrentPage === 1}>Previous</button>
          <button className='btn btn-info' onClick={() => teacherPages("next")} disabled={tCurrentPage === tTotalPages}>Next</button>
        </div>
      )}

      {nonTeachersListMsg === "success" && (
        <>
          {nonTeachersList?.map((teacher) => (
            <div key={teacher.userId}>
              <div className="card">
                {teacher.profilePicture ? (
                  <ProfileImage imageUrl={teacher.profilePicture} size='100px' borderRadius="50%" classVal="card-img-top" />
                ) : (
                  teacher.gender === "Male" ? (
                  <>
                    <ProfileImage imageUrl="/male_avatar.jpeg" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  ) : (
                  <>
                    <ProfileImage imageUrl="female_avatar.png" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  )
                )}
                <div className="card-body">
                  <h5 className="card-title">Name: {teacher.user.lastName} {teacher.user.firstName}</h5>
                  <p className="card-text">Phone Number: {teacher.user.phoneNumber}</p>
                  <div>
                  <button className='btn btn-info' onClick={() => handleViewStaffDetails(teacher)}>
                    View Details
                  </button>
                </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      )}

      {nonTeachersList.length !== 0 && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button className='btn btn-info' onClick={() => nonTeacherPages("previous")} disabled={nCurrentPage === 1}>Previous</button>
          <button className='btn btn-info' onClick={() => nonTeacherPages("next")} disabled={nCurrentPage === nTotalPages}>Next</button>
        </div>
      )}

      {parentsListMsg === "success" && (
        <>
          {parentsList?.map((parent) => (
            <div key={parent.userId}>
              <div className="card">
                {parent.profilePicture ? (
                  <ProfileImage imageUrl={parent.profilePicture} size='100px' borderRadius="50%" classVal="card-img-top" />
                ) : (
                  parent.gender === "Male" ? (
                  <>
                    <ProfileImage imageUrl="/male_avatar.jpeg" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  ) : (
                  <>
                    <ProfileImage imageUrl="female_avatar.png" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  )
                )}
                <div className="card-body">
                  <h5 className="card-title">Name: {parent.user.lastName} {parent.user.firstName}</h5>
                  <p className="card-text">Phone Number: {parent.user.phoneNumber}</p>
                  <div>
                  <button className='btn btn-info' onClick={() => handleViewParentDetails(parent)}>
                    View Details
                  </button>
                </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      )}

      {parentsList.length !== 0 && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button className='btn btn-info' onClick={() => parentPages("previous")} disabled={pCurrentPage === 1}>Previous</button>
          <button className='btn btn-info' onClick={() => parentPages("next")} disabled={pCurrentPage === pTotalPages}>Next</button>
        </div>
      )}

      {studentsListMsg === "success" && (
        <>
          {studentsList?.map((student) => (
            <div key={student.userId}>
              <div className="card">
                {student.profilePicture ? (
                  <ProfileImage imageUrl={student.profilePicture} size='100px' borderRadius="50%" classVal="card-img-top" />
                ) : (
                  student.gender === "Male" ? (
                  <>
                    <ProfileImage imageUrl="/male_avatar.jpeg" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  ) : (
                  <>
                    <ProfileImage imageUrl="female_avatar.png" size='100px' borderRadius="50%" classVal="card-img-top" />
                  </>
                  )
                )}
                <div className="card-body">
                  <h5 className="card-title">Name: {student.user.lastName} {student.user.firstName}</h5>
                  <p className="card-text">Phone Number: {student.user.phoneNumber}</p>
                  <div>
                  <button className='btn btn-info' onClick={() => handleViewStudentDetails(student)}>
                    View Details
                  </button>
                </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      )}

      {studentsList.length !== 0 && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button className='btn btn-info' onClick={() => studentPages("previous")} disabled={sCurrentPage === 1}>Previous</button>
          <button className='btn btn-info' onClick={() => studentPages("next")} disabled={sCurrentPage === sTotalPages}>Next</button>
        </div>
      )}
    </>
  );
}

export default SchoolHomePage;
