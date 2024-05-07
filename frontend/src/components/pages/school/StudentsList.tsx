import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { clearClassCATests, clearResults, resetClassArm, studentsInClassArm } from '../../../features/studentclassSlice';
import ProfileImage from '../../images/ProfileImage';
import { clearSchoolUsers } from '../../../features/schoolSlice';
import store from '../../../store/store';
import { IStudent } from '../../../models/studentModel';

const StudentsList: React.FC = () => {
  const location = useLocation();
  const classId: string = location.state.classArmId;
  const nameOfClass: string = location.state.className;
	const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const { getStdentClass, getStdentClassMsg, studentCurrentPage, studentTotalPages } = useAppSelector((state) => state.studentclass);

  const defaultSize = 3;
  const [size, setSize] = useState<number>(defaultSize);

  const handleViewStudentDetails = (user: IStudent) => {
    store.dispatch(clearSchoolUsers())
    navigate('student-details', { state: { user }})
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(size)) {
      setSize(defaultSize)
    }
    const newSize = parseInt(event.target.value);
    setSize(newSize);
  };

  const studentPages = (option: string) => {
    if (classId) {
      if (option === "previous") {
        dispatch(studentsInClassArm({ studentClassId: classId, page: studentCurrentPage - 1, pageSize: size}))
      } else {
        dispatch(studentsInClassArm({ studentClassId: classId, page: studentCurrentPage + 1, pageSize: size}))
      }
    }
  }

  const addCATests = () => {
    if (classId) {
      store.dispatch(resetClassArm())
      navigate('add-student-ca', { state: { classId, nameOfClass }})
    }
  }

  const showResults = () => {
    if (classId) {
      store.dispatch(clearResults())
      navigate(`get-students-result`, { state: { classId, nameOfClass }})
    }
  }

  useEffect(() => {
    if (classId) {
      dispatch(studentsInClassArm({ studentClassId: classId, page: 1, pageSize: size}))
    }
  }, [classId, dispatch, size])

  useEffect(() => {
    store.dispatch(clearClassCATests());
  }, [])
  
  return (
    <div className='container'>
      <div>
        <h3>Students in {nameOfClass} class</h3>
      </div>
      <div>
        <button className='btn btn-info' onClick={addCATests}>Add Students Scores</button> | 
        <button className='btn btn-info' onClick={showResults}>Show Results</button>
      </div>
      <hr />
      <div>
        <label htmlFor="size">How many students to be displayed at once: </label>
        <input className='form-control' type="number" id="size" value={size} onChange={handlePageSizeChange} />
      </div>
      <div>
        {getStdentClassMsg === "pending" && <p><i>fetching students in the same class. please wait ...</i></p>}
        {getStdentClass?.map((student) => (
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
                  <p className="card-text">Admission Number: {student.admissionNumber}</p>
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
      </div>

      <div>
        {getStdentClass.length !== 0 && (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <button className='btn btn-info' onClick={() => studentPages("previous")} disabled={studentCurrentPage === 1}>Previous</button>
            <button className='btn btn-info' onClick={() => studentPages("next")} disabled={studentCurrentPage === studentTotalPages}>Next</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentsList