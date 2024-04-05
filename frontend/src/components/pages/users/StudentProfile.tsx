import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { School, Zone } from '../../../models/userModel';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getSchoolsInZone } from '../../../features/schoolSlice';
import { getOrganizationZonesByUniqueId } from '../../../features/zoneSlice';
import { createStudentProfile, getSchoolClasses, getSchoolDepatments } from '../../../features/studentSlice';
import { ClassArms, Department, StudentInput } from '../../../models/studentModel';
import { getSchoolsInOrganization } from '../../../features/organizationSlice';
import { getSchoolParents } from '../../../features/parentSlice';
import { IParent } from '../../../models/parentModels';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const StudentProfile: React.FC = () => {
  const { userId } = useAuth();
  const { allSchools } = useAppSelector((state) => state.school);
  const { allZones } = useAppSelector((state) => state.zone);
  const { departments, getDept, classArms, getClass, setMessage, setMsg } = useAppSelector((state) => state.student);
  const { allOrgSch } = useAppSelector((state) => state.organization);
  const { schParents, schParentMsg } = useAppSelector((state) => state.parent);

  const dispatch = useAppDispatch();
  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);
  const navigate = useNavigate()

  const [organizationUniqueId, setOrganizationUniqueId] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [admissionNumber, setAdmissionNumber] = useState<string>("");
  const [admissionYear, setAdmissionYear] = useState<string>("");
  const [schoolZoneId, setSchoolZoneId] = useState<string>("");
  const [currentSchoolId, setCurrentSchoolId] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [studentClassId, setStudentClassId] = useState<string>("");
  const [previousSchoolsIds, setPreviousSchoolsIds] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [parentId, setParentId] = useState<string>("");

  const [schoolsList, setSchoolsList] = useState<School[]>([]);
  const [zonesList, setZonesList] = useState<Zone[]>([]);
  const [deptList, setDeptList] = useState<Department[]>([]);
  const [classList, setClassList] = useState<ClassArms[]>([]);
  const [orgSchoolsList, setOrgSchoolsList] = useState<School[]>([]);
  const [parentsList, setParentsList] = useState<IParent[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const schoolId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setPreviousSchoolsIds(prevSelected => [...prevSelected, schoolId]);
    } else {
      setPreviousSchoolsIds(prevSelected => prevSelected.filter(id => id !== schoolId));
    }
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDateOfBirth(newDate)

    // calculate age based on the date seleted
    const today = new Date();
    const birthDate = new Date(newDate);
    const ageInYears = Math.floor(today.getFullYear() - birthDate.getFullYear())

    // account for months and days if birthday hasn't passed yet in the current year
    const birthMonth = birthDate.getMonth()
    const currentMonth = today.getMonth()
    const birthDay = birthDate.getDate()
    const currentDay = today.getDate()

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      setAge(ageInYears - 1)
    } else {
      setAge(ageInYears)
    }
  }

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const studentData: StudentInput = {
      userId, organizationUniqueId, middleName, admissionNumber, admissionYear, schoolZoneId,
      currentSchoolId, departmentId, studentClassId, previousSchoolsIds, gender,
      dateOfBirth, age, address, religion, parentId
    }
    dispatch(createStudentProfile(studentData));
    if (setMessage === "success") {
      notifySuccess(setMsg)
      navigate('/')
    }
  }

  useEffect(() => {
    if (organizationUniqueId) {
      dispatch(getOrganizationZonesByUniqueId(organizationUniqueId))
    }
  }, [dispatch, organizationUniqueId])

  useEffect(() => {
    if (schoolZoneId !== "") {
      dispatch(getSchoolsInZone(schoolZoneId));
    }
  }, [dispatch, schoolZoneId])

  useEffect(() => {
    if (organizationUniqueId) {
      dispatch(getSchoolsInOrganization(organizationUniqueId))
    }
  }, [dispatch, organizationUniqueId])

  useEffect(() => {
    if (currentSchoolId !== "") {
      dispatch(getSchoolDepatments(currentSchoolId));
    }
  }, [currentSchoolId, dispatch])

  useEffect(() => {
    if (currentSchoolId !== "") {
      dispatch(getSchoolClasses(currentSchoolId));
    }
  }, [currentSchoolId, dispatch])

  useEffect(() => {
    if (currentSchoolId !== "") {
      dispatch(getSchoolParents(currentSchoolId));
    }
  }, [currentSchoolId, dispatch])

  useEffect(() => {
    if (allSchools) {
      setSchoolsList(allSchools)
    }
  }, [allSchools])

  useEffect(() => {
    if (allZones) {
      setZonesList(allZones)
    }
    if (getDept === "success") {
      setDeptList(departments)
    }
    if (getClass === "success") {
      setClassList(classArms)
    }
    if (allOrgSch) {
      setOrgSchoolsList(allOrgSch)
    }
    if (schParentMsg === "success") {
      setParentsList(schParents)
    }
  }, [allOrgSch, allZones, classArms, departments, getClass, getDept, schParentMsg, schParents])
  
  return (
    <div className='container'>
      <form onSubmit={handleSubmitProfile}>
        <div className="form-floating mb-3">
          <input
            type="hidden"
            className="form-control .custom-placeholder"
            id="floatingUserId" 
            name='userId'
            readOnly
            value={userId}
          />
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control .custom-placeholder"
            id="organizationUniqueId" 
            placeholder="Enter the Organization Unique Id you belong to"
            name='organizationUniqueId'
            value={organizationUniqueId}
            required
            onChange={(e) => {
              setOrganizationUniqueId(e.target.value);
            }}
          />
          <label htmlFor="organizationUniqueId">Organization Unique Id</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="middleName" 
            placeholder="Enter your middle name"
            name='middleName'
            value={middleName}
            required
            onChange={(e) => {
              setMiddleName(e.target.value);
            }}
          />
          <label htmlFor="middleName">Middle Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="admissionNumber" 
            placeholder="Enter student's admission number"
            name='admissionNumber'
            value={admissionNumber}
            required
            onChange={(e) => {
              setAdmissionNumber(e.target.value);
            }}
          />
          <label htmlFor="admissionNumber">Admission Number</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="admissionYear" 
            placeholder="Enter student's admission year"
            name='admissionYear'
            value={admissionYear}
            required
            onChange={(e) => {
              setAdmissionYear(e.target.value);
            }}
          />
          <label htmlFor="admissionYear">Admission Year</label>
        </div>

        <div className="mb-3">
          <label htmlFor="schoolZoneId" className="form-label">
            Zone
          </label>
          <select
            className="form-select"
            id="schoolZoneId"
            name="schoolZoneId"
            value={schoolZoneId}
            required
            onChange={(e) => {
              setSchoolZoneId(e.target.value);
            }}
          >
            <option value="" disabled>Select Zone</option>
            {zonesList?.map((zone) => (
              <option key={zone.zoneId} value={zone.zoneId}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="currentSchoolId" className="form-label">
            Your School
          </label>
          <select
            className="form-select"
            id="currentSchoolId"
            name="currentSchoolId"
            value={currentSchoolId}
            required
            onChange={(e) => {
              setCurrentSchoolId(e.target.value);
            }}
          >
            <option value="" disabled>Select School</option>
            {schoolsList?.map((school) => (
              <option key={school.schoolId} value={school.schoolId}>
                {school.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="departmentId" className="form-label">
            Your Department
          </label>
          <select
            className="form-select"
            id="departmentId"
            name="departmentId"
            value={departmentId}
            required
            onChange={(e) => {
              setDepartmentId(e.target.value);
            }}
          >
            <option value="" disabled>Select Department</option>
            {deptList?.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="studentClassId" className="form-label">
            Your Class
          </label>
          <select
            className="form-select"
            id="studentClassId"
            name="studentClassId"
            value={studentClassId}
            required
            onChange={(e) => {
              setStudentClassId(e.target.value);
            }}
          >
            <option value="" disabled>Select Class</option>
            {classList?.map((clas) => (
              <option key={clas.classArmId} value={clas.classArmId}>
                {clas.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor='prevSchsId'>
            Select previous schools you have attended
          </label>
          {orgSchoolsList?.map(school => (
            <div key={school.schoolId}>
              <label>
                <input
                  type="checkbox" 
                  id="prevSchsId" 
                  value={school.schoolId}
                  checked={previousSchoolsIds.includes(school.schoolId)} 
                  onChange={handleCheckboxChange}
                />
                {school.name}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Select Gender
          </label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={gender}
            required
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="" disabled>Your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="dateOfBirth" 
            name='dateOfBirth'
            value={dateOfBirth}
            required
            onChange={handleDateChange}
          />
          <label htmlFor="floatingUsername">Date Of Birth</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingAge" 
            name='age'
            value={age}
            required
            readOnly
          />
          <label htmlFor="floatingUsername">Age</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingMAddress" 
            placeholder="Enter your address"
            name='address'
            value={address}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <label htmlFor="floatingMAddress">Address</label>
        </div>

        <div className="mb-3">
          <label htmlFor="religion" className="form-label">
            Select Religion
          </label>
          <select
            className="form-select"
            id="religion"
            name="religion"
            value={religion}
            required
            onChange={(e) => {
              setReligion(e.target.value);
            }}
          >
            <option value="" disabled>Choose A Religion</option>
            <option value="Christianity">Christianity</option>
            <option value="Islam">Islam</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="parentId" className="form-label">
            Your Parent
          </label>
          <select
            className="form-select"
            id="parentId"
            name="parentId"
            value={parentId}
            required
            onChange={(e) => {
              setParentId(e.target.value);
            }}
          >
            <option value="" disabled>Select Department</option>
            {parentsList?.map((parent) => (
              <option key={parent.userId} value={parent.parentId}>
                {parent.user.firstName} {parent.user.firstName} ({parent.title})
              </option>
            ))}
          </select>
        </div>

        <button className='btn btn-primary' type="submit">Create Profile</button>

      </form>
    </div>
  )
}

export default StudentProfile