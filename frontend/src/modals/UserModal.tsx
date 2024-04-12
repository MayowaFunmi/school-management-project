import React from 'react'
import { UserDetailsProps } from '../models/userModel'
import TeacherDetails from '../components/pages/users/TeacherDetails'
import NonTeacherDetails from '../components/pages/users/NonTeacherDetails'
import ParentDetails from '../components/pages/users/ParentDetails'
import StudentDetails from '../components/pages/users/StudentDetails'

const UserModal: React.FC<UserDetailsProps> = ({ isModalOpen, closeModal, user, roleName }) => {
  return (
    <>
      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog custom-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile Page : {user?.user.lastName} {user?.user.firstName}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>User Roles: {user?.userRoles.join(', ')}</p>
                {roleName === "TeachingStaff" && user?.teacherProfile && <TeacherDetails data={user.teacherProfile} />}
                {roleName === "NonTeachingStaff" && user?.nonTeacherProfile && <NonTeacherDetails data={user.nonTeacherProfile} />}
                {roleName === "Parent" && user?.parentProfile && <ParentDetails data={user.parentProfile} />}
                {roleName === "Student" && user?.studentProfile && <StudentDetails data={user.studentProfile} />}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default UserModal