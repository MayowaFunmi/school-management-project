import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { addStudentsCATests, allStudentsInClassArm } from '../../../features/studentclassSlice';
import axios from 'axios';
import { baseUrl } from '../../../config/Config';
import { Subject } from '../../../models/userModel';
import { ScoreData, ScoreDto, Sessions } from '../../../models/studentModel';
import { toast } from 'react-toastify';

const AddStudentsCA: React.FC = () => {
	//const { classId } = useParams<{ classId?: string}>();
  const location = useLocation();
  const classId: string = location.state.classId;
  const nameOfClass: string = location.state.nameOfClass;
  const dispatch = useAppDispatch();
  const notifySuccess = (msg: string) => toast.success(msg);
  const navigate = useNavigate()

  const [studentsScores, setStudentScores] = useState<ScoreDto[]>([])
  const [subjects, setSubjects] = useState<Subject[] | []>([])
  const [sessions, setSessions] = useState<Sessions[] | []>([])
  const [subjectId, setSubjectId] = useState<string | "">("")
  const [sessionId, setSessionId] = useState<string | "">("")
  const [term, setTerm] = useState<string | "">("")

  const { getAllStdentClass, getAllStdentClassMsg, scoreMsg } = useAppSelector((state) => state.studentclass);
  
  const handleScoreChange = (studentId: string, field: keyof ScoreDto, value: string) => {
    const updatedScores = [...studentsScores];
    const studentIndex = updatedScores.findIndex(score => score.studentId === studentId);
    if (studentIndex !== -1) {
      updatedScores[studentIndex] = {
        ...updatedScores[studentIndex],
        [field]: parseInt(value)
      };
      setStudentScores(updatedScores);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const scoreData: ScoreData = {
      classId, subjectId, term, sessionId, studentsScores
    }
    dispatch(addStudentsCATests(scoreData))
    if (scoreMsg) {
      notifySuccess(scoreMsg)
    }
		navigate('students-in-class-arm', { state: { classArmId: classId, className: nameOfClass }})
  }

  useEffect(() => {
    if (classId) {
      dispatch(allStudentsInClassArm(classId))
    }
  }, [classId, dispatch])

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
          <h3>Add Continuous Assessment scores for {nameOfClass} students</h3>
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

            <div className='mb-3'>
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
                  Select a subject
                </option>
                {subjects?.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subjectName}
                </option>
              ))}
              </select>
            </div>

            {getAllStdentClassMsg === 'success' &&
              getAllStdentClass?.map((student) => (
                <>
                  <div key={student.userId} className='form-control mb-3'>
                    <label htmlFor={`student-${student.userId}`}>
                      {student.user.lastName} {student.user.lastName} {student.middleName}
                    </label>
                    <input
                      className='form-control mb-3'
                      type="number"
                      id={`student-${student.userId}-CATest1`}
                      max={20}
                      value={studentsScores.find(score => score.studentId === student.userId)?.caTest1 || 0}
                      onChange={(e) => handleScoreChange(student.userId, 'caTest1', e.target.value)}
                    />

                    <input
                      className='form-control mb-3'
                      type="number"
                      id={`student-${student.userId}-CATest2`}
                      max={20}
                      value={studentsScores.find(score => score.studentId === student.userId)?.caTest2 || 0}
                      onChange={(e) => handleScoreChange(student.userId, 'caTest2', e.target.value)}
                    />

                    <input
                      className='form-control mb-3'
                      type="number"
                      id={`student-${student.userId}-CATest3`}
                      max={20}
                      value={studentsScores.find(score => score.studentId === student.userId)?.caTest3 || 0}
                      onChange={(e) => handleScoreChange(student.userId, 'caTest3', e.target.value)}
                    />

                    <input
                      className='form-control mb-3'
                      type="number"
                      id={`student-${student.userId}-Exam`}
                      max={70}
                      value={studentsScores.find(score => score.studentId === student.userId)?.exam || 0}
                      onChange={(e) => handleScoreChange(student.userId, 'exam', e.target.value)}
                    />
                  </div>
                  <hr />
                </>
              ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default AddStudentsCA