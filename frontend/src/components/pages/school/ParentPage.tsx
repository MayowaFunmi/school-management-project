import React, { useEffect, useState } from 'react'
import { IParent } from '../../../models/parentModels';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import { clearSchoolUsers, resetOrganizationSchool, resetSchoolsById } from '../../../features/schoolSlice';
import store from '../../../store/store';
import { clearUploadStatus, uploadProfilePicture } from '../../../features/uploadSlice';
import ProfileImage from '../../images/ProfileImage';
import { formatDateOfBirth } from '../../../utils/formatDate';

const ParentPage = () => {
  const location = useLocation();
  const data: IParent = location.state.user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const { status } = useAppSelector((state) => state.upload);

  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const progressWith = `${data.user.percentageCompleted}%`;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    setIsModalOpen(true);
  }

  const schoolDetails = (schoolId: string) => {
    store.dispatch(resetOrganizationSchool())
    store.dispatch(clearSchoolUsers())
    navigate(`/school-home-page/${schoolId}`);
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

  useEffect(() => {
    if (status === "success") {
      notifySuccess("Profile Picture uploaded successfully")
    } else if (status === "failed") {
      notifyError("failed To Upload Profile Picture")
    }
  }, [status])

  useEffect(() => {
    store.dispatch(clearUploadStatus());
    store.dispatch(resetSchoolsById());
  }, [])

  return (
    <div className='container'>
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
          <p><strong>Name: </strong>{data.user.firstName} {data.user.lastName} ({data.title})</p>
          <p><strong>Email: </strong>{data.user.email}</p>
          <p><strong>Phone Number: </strong>{data.user.phoneNumber}</p>
          <p><strong>Username: </strong>{data.user.userName}</p>
          <p><strong>Address: </strong>{data.address}</p>
          <p><strong>Date Of Birth: </strong>{formatDateOfBirth(data.dateOfBirth)}</p>
          <p><strong>Age: </strong>{data.age} years</p>
          <p><strong>Marital Status: </strong>{data.maritalStatus}</p>
          <p><strong>State Of Origin: </strong>{data.stateOfOrigin}</p>
          <p><strong>LGA Of Origin: </strong>{data.lgaOfOrigin}</p>
          <p><strong>LGA Of Residence: </strong>{data.lgaOfResidence}</p>
          <p><strong>Religion: </strong>{data.religion}</p>
          <p><strong>Gender: </strong>{data.gender}</p>
          <p><strong>Relationship To Student: </strong>{data.relationshipType}</p>
          <p><strong>Occupation: </strong>{data.occupation}</p>
        </div>
      </div>
      <hr />

      <div className='row'>
        <div className="col-sm-5">
          <p><strong>Organization Unique ID: </strong>{data.organizationUniqueId}</p>
          <div>
            <p><strong>Student School: </strong>{data.studentSchool.name}</p>
            <p><strong>School Address: </strong>{data.studentSchool.address}</p>
            <button className='btn btn-info' onClick={() => schoolDetails(data.studentSchoolId)}>Go To School Page</button>
          </div>
        </div>

        <div className="col-sm-7">
          
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
    </div>
  )
}

export default ParentPage