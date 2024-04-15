import React, { useEffect, useState } from 'react'
import { IStudent } from '../../../models/studentModel'
import ProfileImage from '../../images/ProfileImage';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import { clearUploadStatus, uploadProfilePicture } from '../../../features/uploadSlice';
import { formatDateOfBirth } from '../../../utils/formatDate';
import { School } from '../../../models/userModel';
import { clearSchoolUsers, getSchoolsByIds, resetOrganizationSchool, resetSchoolsById } from '../../../features/schoolSlice';
import store from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { clearSubjectsByIds } from '../../../features/subjectSlice';

interface StudentDetailPage {
  data: IStudent
}

const StudentDetails: React.FC<StudentDetailPage> = ({ data }) => {
  const progressWith = `${data.user.percentageCompleted}%`;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.upload);

  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [schoolsList, setSchoolsList] = useState<School[]>([])
  const { allSchoolIds, schIdMsg } = useAppSelector((state) => state.school);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    setIsModalOpen(true);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage)
    }
  }

  const handleSubmit = () => {
    if (image) {
      const formData = new FormData();
      formData.append('profilePicture', image);
      dispatch(uploadProfilePicture(formData));
    }
  }

  const schoolDetails = (schoolId: string) => {
    store.dispatch(resetOrganizationSchool())
    store.dispatch(clearSchoolUsers())
    navigate(`/school-home-page/${schoolId}`);
  }

  useEffect(() => {
    if (status === "success") {
      notifySuccess("Profile Picture uploaded successfully")
    } else if (status === "failed") {
      notifyError("failed To Upload Profile Picture")
    }
  }, [status])

  useEffect(() => {
    if (data.previousSchoolsIds.length > 0) {
      dispatch(getSchoolsByIds(data.previousSchoolsIds));
    }
  }, [data.previousSchoolsIds, dispatch])

  useEffect(() => {
    if (schIdMsg === "success") {
      setSchoolsList(allSchoolIds);
    }
  }, [allSchoolIds, schIdMsg])

  useEffect(() => {
    store.dispatch(clearUploadStatus());
    store.dispatch(resetSchoolsById());
    store.dispatch(clearSubjectsByIds());
  }, [])
    
  return (
    <>
      <div className='row'>
        <h3>Percentage Completed: {data.user.percentageCompleted}%</h3>
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={data.user.percentageCompleted} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: progressWith }}></div>
        </div>
        <div className="col-sm-5">
          {data.profilePicture ? (
            <ProfileImage imageUrl={data.profilePicture} size='200px' borderRadius="50%" classVal='' />
          ) : (
            data.gender === "Male" ? (
            <>
              <ProfileImage imageUrl="/male_avatar.jpeg" size='200px' borderRadius="50%" classVal='' />
              <button 
                className="btn btn-primary"
                onClick={handleUpload}
              >
                Add Picture
              </button>
            </>
            ) : (
            <>
              <ProfileImage imageUrl="female_avatar.png" size='200px' borderRadius="50%" classVal='' />
              <button 
                className="btn btn-primary"
                onClick={handleUpload}
              >
                Add Picture
              </button>
            </>
            )
          )}
          <p><strong>Unique ID: </strong>{data.user.uniqueId}</p>
        </div>

        <div className="col-sm-7">
          <p><strong>Name: </strong>{data.user.lastName} {data.user.firstName} {data.middleName}</p>
          <p><strong>Email: </strong>{data.user.email}</p>
          <p><strong>Phone Number: </strong>{data.user.phoneNumber}</p>
          <p><strong>Username: </strong>{data.user.userName}</p>
          <p><strong>Address: </strong>{data.address}</p>
          <p><strong>Date Of Birth: </strong>{formatDateOfBirth(data.dateOfBirth)}</p>
          <p><strong>Age: </strong>{data.age} years</p>
          <p><strong>Religion: </strong>{data.religion}</p>
          <p><strong>Gender: </strong>{data.gender}</p>
        </div>
      </div>
      <hr />

      <div className='row'>
        <div className="col-sm-5">
          <div>
            <p><strong>Name Of School: </strong>{data.currentSchool.name}</p>
            <p><strong>School Address: </strong>{data.currentSchool.address}</p>
            <button className='btn btn-info' onClick={() => schoolDetails(data.currentSchoolId)}>Go To School Page</button>
          </div>
          <p><strong>Department: </strong>{data.department.name} class</p>
          <p><strong>Class: </strong>{data.studentClass.name}</p>
          <p><strong>Admission Number: </strong>{data.admissionNumber}</p>
          <p><strong>Admission Year: </strong>{data.admissionYear}</p>
          <p><strong>Parent: </strong>{data.parent.title} {data.parent.user.firstName} {data.parent.user.lastName}</p>
          {/* add link to parent profile page */}
        </div>

        <div className="col-sm-7">
          <p><strong>Previous Schools Attended: </strong></p>
          {schoolsList.length > 0 ? (
            <div>
            {
              schoolsList?.map((school) => (
                <div key={school.schoolId}>
                  <ol>
                    <li>
                      <div onClick={() => schoolDetails(school.schoolId)} style={{ cursor: "pointer"}}>
                        <strong>School Name:</strong> {school.name}<br />
                        <strong>School ID:</strong> {school.schoolUniqueId}<br />
                        <small><strong>School Address:</strong> {school.address}</small>
                      </div>
                    </li>
                  </ol>
                </div>
              ))
            }
          </div>
          ) : (
            <p>None</p>
          )}
        </div>
      </div>

      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload Profile Picture For {data.user.userName}</h5>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <input type="file" accept='image/*' onChange={handleFileChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={status === "success" || status === "loading" ? (true) : (false)}
              >
                {status === "loading" ? ("Please wait") 
                  : 
                (status === "failed" || status === "idle" ? (
                  "Upload Picture"
                ) : ("Uploaded!"))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDetails