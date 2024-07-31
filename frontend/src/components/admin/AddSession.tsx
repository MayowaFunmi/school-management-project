import React, { useState } from 'react'
import { SessionDto } from '../../models/schoolModel'
import axios from 'axios'
import { baseUrl, getAxiosConfig } from '../../config/Config'
import { toast } from 'react-toastify'

const AddSession: React.FC = () => {
  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  const [name, setName] = useState<string | "">("")
  const [sessionStarts, setSessionStarts] = useState<string | "">("")
  const [sessionEnds, setSessionEnds] = useState<string | "">("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const sessionData: SessionDto = {
      name, sessionStarts, sessionEnds
    }
    const response = await axios.post(`${baseUrl}/school/add-school-session`, {sessionData}, getAxiosConfig());
    if (response.data.status === "Ok") {
      notifySuccess("Session added successfully")
    } else {
      notifyError("failed to add session")
    }
    setName("");
    setSessionStarts("")
    setSessionEnds("")
  }

  return (
    <div className='container'>
      <h3>Add School Session</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name" 
            placeholder="Enter Session Name e.g '2023/2024'"
            name='name'
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="name">Enter Session Name e.g 2023/2024</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="sessionStarts" 
            name='sessionStarts'
            value={sessionStarts}
            required
            onChange={(e) => setSessionStarts(e.target.value)}
          />
          <label htmlFor="sessionStarts">Choose Session Start Date</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="sessionEnds" 
            name='sessionEnds'
            value={sessionEnds}
            required
            onChange={(e) => setSessionEnds(e.target.value)}
          />
          <label htmlFor="sessionEnds">Choose Session End Date</label>
        </div>

        <button type='submit' className="btn btn-info">Add Session</button>
      </form>
    </div>
  )
}

export default AddSession