import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { addStudentsCATests, allStudentsInClassArm, clearClassCATests } from '../../../features/studentclassSlice';
import axios from 'axios';
import { baseUrl } from '../../../config/Config';
import { Subject } from '../../../models/userModel';
import { ScoreData } from '../../../models/studentModel';
import store from '../../../store/store';
import { toast } from 'react-toastify';

const AddStudentsCA1: React.FC = () => {
	//const { classId } = useParams<{ classId?: string}>();
  const location = useLocation();
  const classId: string = location.state.classId;
  const nameOfClass: string = location.state.nameOfClass;
  const dispatch = useAppDispatch();
  const notifySuccess = (msg: string) => toast.success(msg);
  const navigate = useNavigate()

  const [studentScores, setStudentScores] = useState<{ [key: string]: number }>({})
  const [subjects, setSubjects] = useState<Subject[] | []>([])
  const [subjectId, setSubjectId] = useState<string | "">("")
  const [term, setTerm] = useState<string | "">("")

  const { getAllStdentClass, getAllStdentClassMsg, scoreMsg } = useAppSelector((state) => state.studentclass);

  const handleScoreChange = (studentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newScores = { ...studentScores, [studentId]: parseInt(event.target.value) };
    setStudentScores(newScores)
  }

  const formatScores = (studentScores: { [key: string]: number }): { studentId: string, score: number }[] => {
    return Object.entries(studentScores).map(([studentId, score]) => ({
      studentId: studentId,
      score: score
    }));
  }
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const scoreData: ScoreData = {
      classId, subjectId, term, scores: formatScores(studentScores)
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Add Continuous Assessment scores for {nameOfClass} students</h3>
          <div>
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

            {getAllStdentClassMsg === 'success' &&
              getAllStdentClass?.map((student) => (
                <div key={student.userId} className='form-floating mb-3'>
                  <label htmlFor={`score-${student.userId}`}>
                    {student.user.lastName} {student.user.firstName} {student.middleName}
                  </label>
                  <input
                    className='form-control'
                    type="number"
                    id={`score-${student.userId}`}
                    name={`score-${student.userId}`}
                    value={studentScores[student.userId] || ''}
                    onChange={(e) => handleScoreChange(student.userId, e)}
                  />
                  <hr />
                </div>
              ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default AddStudentsCA1