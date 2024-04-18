import React, { useState } from 'react'
import { AddClassProps } from '../models/userModel'
import { toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from '../hooks/useTypedSelector'
import { SchoolDept } from '../models/studentModel'
import { addSchoolDepartment } from '../features/studentclassSlice'

const AddSchoolDept: React.FC<AddClassProps> = ({ isModalOpen, closeModal, schoolId }) => {
  const [name, setName] = useState<string | "">("")
  const dispatch = useAppDispatch()
  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const { addDeptMsg, msg } = useAppSelector((state) => state.studentclass)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (schoolId) {
      const data: SchoolDept = { schoolId, name }
      dispatch(addSchoolDepartment(data))
      if (addDeptMsg === "success") {
        notifySuccess(msg)
      } else {
        notifyError(msg)
      }
    }
  }

  return (
    <>
      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog custom-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Department</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Select Department
                    </label>
                    <select
                      className="form-select"
                      id="name"
                      name="name"
                      value={name}
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    >
                      <option value="" disabled>Choose A Department</option>
                      <option value="Science">Science</option>
                      <option value="Arts">Arts</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Junior School">Junior School</option>
                    </select>
                  </div>

                  <button className='btn btn-primary' type='submit'
                    disabled={addDeptMsg === "success" ? true : false}
                  >
                    Add Department
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

export default AddSchoolDept