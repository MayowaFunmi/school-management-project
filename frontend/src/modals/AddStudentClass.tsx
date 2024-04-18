import React, { useState } from 'react'
import { AddClassProps } from '../models/userModel'
import { ClassValues } from '../models/studentModel'
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector'
import { addSchoolClass } from '../features/studentclassSlice'
import { toast } from 'react-toastify'

const AddStudentClass: React.FC<AddClassProps> = ({ isModalOpen, closeModal, schoolId }) => {

  const [name, setName] = useState<string | "">("")
  const [arm, setArm] = useState<number>(0)
  const dispatch = useAppDispatch()
  const notifySuccess = (msg: string) => toast.success(msg);

  const { addClassMsg } = useAppSelector((state) => state.studentclass)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (schoolId) {
      const data: ClassValues = { schoolId, name, arm }
      dispatch(addSchoolClass(data))
      if (addClassMsg === "success") {
        notifySuccess("class added successfully")
      }
    }
  }

  return (
    <>
      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog custom-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Class</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control .custom-placeholder"
                      id="name" 
                      placeholder="Class Name: e.g SSS 1, SSS 2, JSS 3, etc"
                      name='name'
                      value={name}
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <label htmlFor="name">Class Name: e.g SSS 1, SSS 2, JSS 3, etc</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control .custom-placeholder"
                      id="arm" 
                      placeholder="How many arms does this class have?"
                      name='arm'
                      value={arm}
                      required
                      onChange={(e) => {
                        setArm(parseInt(e.target.value))
                      }}
                    />
                    <label htmlFor="name">Number of arms</label>
                  </div>

                  <button className='btn btn-primary' type='submit'
                    disabled={addClassMsg === "success" ? true : false}
                  >
                    Add Class
                  </button>
                </form>
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

export default AddStudentClass