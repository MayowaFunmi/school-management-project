import React, { useEffect, useState } from 'react'
import { IParent } from '../../../models/parentModels';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import { uploadProfilePicture } from '../../../features/uploadSlice';
import ProfileImage from '../../images/ProfileImage';
import { formatDateOfBirth } from '../../../utils/formatDate';

interface ParentDetailsProps {
  data: IParent;
}

const ParentDetails: React.FC<ParentDetailsProps> = ({ data }) => {
  const dispatch = useAppDispatch();
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
  
  return (
    <>
      <div className='row'>
        <h3>Percentage Completed: {data.user.percentageCompleted}%</h3>
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={data.user.percentageCompleted} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: progressWith }}></div>
        </div>
        <div className="col-sm-5">
          {data.profilePicture ? (
            <ProfileImage imageUrl={data.profilePicture} size='200px' />
          ) : (
            data.gender === "Male" ? (
            <>
              <ProfileImage imageUrl="/male_avatar.jpeg" size='200px' />
              <button 
                className="btn btn-primary"
                onClick={handleUpload}
              >
                Add Picture
              </button>
            </>
            ) : (
            <>
              <ProfileImage imageUrl="female_avatar.png" size='200px' />
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
    </>
  )
}

export default ParentDetails