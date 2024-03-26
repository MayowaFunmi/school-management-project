import React, { useEffect, useState } from 'react'
import { TeachingStaff } from '../../../models/staffModel'
import { formatDateOfBirth } from '../../../utils/formatDate';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getSchoolsByIds } from '../../../features/schoolSlice';
import { School } from '../../../models/userModel';

interface TeacherDetailsProps {
  data: TeachingStaff;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { allSchoolIds, schIdMsg } = useAppSelector((state) => state.school);

  const [schoolsList, setSchoolsList] = useState<School[]>([])

  useEffect(() => {
    dispatch(getSchoolsByIds(data.previousSchoolsIds));
  }, [data.previousSchoolsIds, dispatch])

  useEffect(() => {
    if (schIdMsg === "success") {
      setSchoolsList(allSchoolIds);
    }
  }, [allSchoolIds, schIdMsg])
  
  return (
    <>
      <div className='row'>
        <h3>Percentage Completed: {data.user.percentageCompleted}%</h3>
        <p>About me: {data.aboutMe}</p>
        <div className="col-sm-5">
          <h2>profile picture here</h2>
          <p><strong>Unique ID: </strong>{data.user.uniqueId}</p>
        </div>

        <div className="col-sm-7">
          <p><strong>Name: </strong>{data.user.firstName} {data.middleName} {data.user.lastName} ({data.title})</p>
          <p><strong>Email: </strong>{data.user.email}</p>
          <p><strong>Phone Number: </strong>{data.user.phoneNumber}</p>
          <p><strong>Username: </strong>{data.user.userName}</p>
          <p><strong>Address: </strong>{data.address}</p>
          <p><strong>Date Of Birth: </strong>{formatDateOfBirth(data.dateOfBirth)}</p>
          <p><strong>Age: </strong>{data.age} years</p>
          <p><strong>Marital Status: </strong>{data.maritalStatus}</p>
          <p><strong>State Of Origin: </strong>{data.stateOfOrigin}</p>
          <p><strong>LGA Of Origin: </strong>{data.lgaOfOrigin}</p>
          <p><strong>Religion: </strong>{data.religion}</p>

        </div>
      </div>
      <hr />

      <div className='row'>
        <div className="col-sm-5">
          <p><strong>Designation: </strong>{data.designation}</p>
          <p><strong>Present School: </strong>{data.currentPostingSchool.name}</p>
          <p><strong>School Address: </strong>{data.currentPostingSchool.address}</p>
          <p><strong>Zone: </strong>{data.currentPostingZone.name}</p>
          <p><strong>Subject Taught: </strong>{data.currentSubject.subjectName}</p>
          <p><strong>Other Subjects: </strong>{}</p> 
          <p><strong>Grade Level: </strong>Level {data.gradeLevel}, Step {data.step}</p>
          <p><strong>Qualification: </strong>{data.qualification}</p>
          <p><strong>Discipline: </strong>{data.discipline}</p>

        </div>

        <div className="col-sm-7">
          <p><strong>Date Of First Appointment: </strong>{formatDateOfBirth(data.firstAppointment)}</p>
          <p><strong>Number of Years In Service: </strong>{data.yearsInService}</p>
          <p><strong>Previous Schools Posted: </strong></p>
          <div>
            {
              schoolsList?.map((school) => (
                <div key={school.schoolId}>
                  <ol>
                    <li>
                      <div>
                        <strong>School Name:</strong> {school.name}<br />
                        <small><strong>School Address:</strong> {school.address}</small>
                      </div>
                    </li>
                  </ol>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherDetails