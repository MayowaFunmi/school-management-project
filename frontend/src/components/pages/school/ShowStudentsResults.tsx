import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { Subject } from '../../../models/userModel';
import axios from 'axios';
import { baseUrl } from '../../../config/Config';
import { ResultQuery, Sessions } from '../../../models/studentModel';
import { clearResults, getStudentResults } from '../../../features/studentclassSlice';
import store from '../../../store/store';

const ShowStudentsResults: React.FC = () => {
  const location = useLocation();
  const classId: string = location.state.classId;
  const nameOfClass: string = location.state.nameOfClass;
  const dispatch = useAppDispatch();
  const notifySuccess = (msg: string) => toast.success(msg);
  const navigate = useNavigate()

  const { resultData, resultMsg } = useAppSelector((state) => state.studentclass);
  
  const [subjects, setSubjects] = useState<Subject[] | []>([])
  const [subjectId, setSubjectId] = useState<string | "">("")
  const [term, setTerm] = useState<string | "">("")
  const [sessions, setSessions] = useState<Sessions[] | []>([])
  const [sessionId, setSessionId] = useState<string | "">("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.dispatch(clearResults());
    const query: ResultQuery = {
      sessionId, classId, subjectId, term
    }
    dispatch(getStudentResults(query));
  }

  useEffect(() => {
    const getSubjects = async () => {
      const response = await axios.get(`${baseUrl}/admin/get-all-subjects`)
      setSubjects(response.data.data)
    }
    getSubjects()
  }, [])

  useEffect(() => {
    const getSessions = async () => {
      const response = await axios.get(`${baseUrl}/school/get-school-session`)
      setSessions(response.data)
    }
    getSessions()
  }, [])
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Results For {nameOfClass} Students</h3>
          <div>

          <div className="mb-3">
              <label htmlFor="sessionId" className="form-label">
                Select Session
              </label>
              <select
                className="form-select"
                id="sessionId"
                name="sessionId"
                value={sessionId}
                required
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="" disabled>
                Choose a Session
              </option>
              {sessions?.map((session) => (
                <option key={session.schoolSessionId} value={session.schoolSessionId}>
                  {session.name}
                </option>
              ))}
              </select>
            </div>

            <div className='mb-3'>
              <label htmlFor="term" className="form-label">
                Select Term
              </label>
              <select
                className="form-select"
                id="term"
                name="term"
                value={term}
                required
                onChange={(e) => setTerm(e.target.value)}
              >
                <option value="" disabled>
                  Select a term
                </option>
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="subjectId" className="form-label">
                Select Subject
              </label>
              <select
                className="form-select"
                id="subjectId"
                name="subjectId"
                value={subjectId}
                required
                onChange={(e) => setSubjectId(e.target.value)}
              >
                <option value="" disabled>
                Select a Subject
              </option>
              {subjects?.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit">Show Result</button>
      </form>

      {/* display scores */}
      {resultMsg === "pending" && <p><i>fetching results, please wait ...</i></p>}
      {resultMsg === "success" && 
        <div className="">
          <div>
            <h3>{term} result for {nameOfClass} students:</h3>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th colSpan={3}>Admission Number</th>
                <th>CA1</th>
                <th>CA2</th>
                <th>CA3</th>
                <th>CATotal</th>
                <th>Exam</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {resultData?.map((result) => (
                <tr key={result.studentId}>
                  {/* add onClick to go to student profile */}
                  <td colSpan={3}>{`${result.studentData.lastName}, ${result.studentData.firstName} ${result.studentData.middleName}`}</td>
                  <td>{result.studentData.admissionnumber}</td>
                  <td>{result.caTest1}</td>
                  <td>{result.caTest2}</td>
                  <td>{result.caTest3}</td>
                  <td>{result.caTest1 + result.caTest2 + result.caTest3}</td>
                  <td>{result.exam}</td>
                  <td>{result.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
      }
    );
    </div>
  );
}

export default ShowStudentsResults