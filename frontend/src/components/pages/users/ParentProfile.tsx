import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { statesData } from '../../../utils/statesData';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { createParentProfile } from '../../../features/parentSlice';
import { ParentInput } from '../../../models/parentModels';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { School } from '../../../models/userModel';
import { getSchoolsInOrganization } from '../../../features/organizationSlice';

const ParentProfile: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);
  const { parentMsg, msg } = useAppSelector((state) => state.parent)
  const { allSchools } = useAppSelector((state) => state.school);

  const [schoolsList, setSchoolsList] = useState<School[]>([]);
  
  const [studentSchoolId, setStudentSchoolId] = useState<string>("")
  const [title, setTitle] = useState<string>("");
  const [organizationUniqueId, setOrganizationUniqueId] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [relationshipType, setRelationshipType] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [stateOfOrigin, setStateOfOrigin] = useState<string>("");
  const [lgaOfOrigin, setLgaOfOrigin] = useState<string>("");
  const [lgaOfResidence, setLgaOfResidence] = useState<string>("");
  const [lgas, setLgas] = useState<string[]>([]);
  const [occupation, setOccupation] = useState<string>("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parentData: ParentInput = {
      userId, organizationUniqueId, studentSchoolId, title, dateOfBirth, age: 0,
      relationshipType, gender, address, religion, maritalStatus, stateOfOrigin, lgaOfOrigin,
      lgaOfResidence, occupation: ''
    }
    dispatch(createParentProfile(parentData));
    if (parentMsg === "success") {
      notifySuccess(msg)
    } else {
      notifyError("something went wrong")
    }
    navigate('/check-user-status')
  }

  useEffect(() => {
    if (organizationUniqueId) {
      dispatch(getSchoolsInOrganization(organizationUniqueId))
    }
  }, [dispatch, organizationUniqueId])

  useEffect(() => {
    if (allSchools) {
      setSchoolsList(allSchools)
    }
  }, [allSchools])

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-3">
          <label htmlFor="studentSchoolId" className="form-label">
            School your child attends
          </label>
          <select
            className="form-select"
            id="studentSchoolId"
            name="studentSchoolId"
            value={studentSchoolId}
            required
            onChange={(e) => {
              setStudentSchoolId(e.target.value);
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
          <label htmlFor="title" className="form-label">
            Select Title
          </label>
          <select
            className="form-select"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          >
            <option value="" disabled>Choose A Title</option>
            <option value="Mr">Mr</option>
            <option value="Miss">Miss</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
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

        <div className="mb-3">
          <label htmlFor="relationshipType" className="form-label">
            Your Relationship with the student
          </label>
          <select
            className="form-select"
            id="relationshipType"
            name="relationshipType"
            value={relationshipType}
            required
            onChange={(e) => {
              setRelationshipType(e.target.value);
            }}
          >
            <option value="" disabled>Select A Relationship Category</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
            <option value="GrandParent">GrandParent</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Others">Others</option>
          </select>
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
          <label htmlFor="maritalStatus" className="form-label">
            Select Marital Status
          </label>
          <select
            className="form-select"
            id="maritalStatus"
            name="maritalStatus"
            value={maritalStatus}
            required
            onChange={(e) => {
              setMaritalStatus(e.target.value);
            }}
          >
            <option value="" disabled>What is your marital status</option>
            <option value="Single">Single</option>
            <option value="Engaged">Engaged</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widow">Widow</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="stateOfOrigin" className="form-label">
            Select State Of origin
          </label>
          <select
            className="form-select"
            id="stateOfOrigin"
            name="stateOfOrigin"
            value={stateOfOrigin}
            required
            onChange={(e) => {
              const newState = e.target.value as string;
              setStateOfOrigin(newState);
              setLgas(statesData.find(state => state.state === newState)?.lgas || []);
            }}
          >
            <option value="" disabled>
            Select a state
          </option>
          {statesData.map((state) => (
            <option key={state.state} value={state.state}>
              {state.state}
            </option>
          ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="lgaOfOrigin" className="form-label">
            Select LGA Of Origin
          </label>
          <select
            className="form-select"
            id="lgaOfOrigin"
            name="lgaOfOrigin"
            value={lgaOfOrigin}
            required
            onChange={(e) => {
              setLgaOfOrigin(e.target.value);
            }}
            disabled={!stateOfOrigin}
          >
            <option value="" disabled>
              Select LGA
            </option>
            {lgas.map((lgaName) => (
              <option key={lgaName} value={lgaName}>
                {lgaName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="lgaOfResidence" className="form-label">
            Select LGA Of Residence
          </label>
          <select
            className="form-select"
            id="lgaOfResidence"
            name="lgaOfResidence"
            value={lgaOfResidence}
            required
            onChange={(e) => {
              setLgaOfResidence(e.target.value);
            }}
            disabled={!stateOfOrigin}
          >
            <option value="" disabled>
              Select LGA
            </option>
            {lgas.map((lgaName) => (
              <option key={lgaName} value={lgaName}>
                {lgaName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control .custom-placeholder"
            id="occupation" 
            placeholder="Enter your occupation"
            name='occupation'
            value={occupation}
            required
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
          />
          <label htmlFor="occupation">Occupation</label>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ParentProfile