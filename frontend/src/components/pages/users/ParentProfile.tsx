import React from 'react'

const ParentProfile: React.FC = () => {
  return (
    <div className='container'>
      <form onSubmit="">
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
            className="form-control"
            id="schoolUniqueId" 
            placeholder="Enter the school id your ward belongs to"
            name='schoolUniqueId'
            value={schoolUniqueId}
            required
            onChange={(e) => {
              setSchoolUniqueId(e.target.value);
            }}
          />
          <label htmlFor="schoolUniqueId">School Unique Id</label>
        </div>
















        {!isFirstPartComplete && (
          <>
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

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingMiddleName" 
                placeholder="Enter your middle name"
                name='middleName'
                value={middleName}
                required
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
              />
              <label htmlFor="floatingUsername">Middle Name</label>
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
              <label htmlFor="lga" className="form-label">
                Select LGA
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
                disabled={!stateOfOrigin} // Disable LGA selection if no state is chosen
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

            <div className="form-floating mb-3">
              <textarea
                name="aboutMe" 
                id="aboutMe" 
                placeholder='Write something about yourself ...' 
                cols={40} 
                rows={5} 
                value={aboutMe} 
                onChange={(e) => {setAboutMe(e.target.value)}} 
                required
              >
              </textarea>
            </div>
          </>
        )}

        {isFirstPartComplete && (
          <>
            <div className="mb-3">
              <label htmlFor="designation" className="form-label">
                What is your designation?
              </label>
              <select
                className="form-select"
                id="designation"
                name="designation"
                value={designation}
                required
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              >
                <option value="" disabled>Your Designation</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Principal">Principal</option>
                <option value="VicePrincipal">Vice Principal</option>
                <option value="HeadOfDepartment">Head Of Department</option>
                <option value="ClassTeacher">Class Teacher</option>
                <option value="OfficeAssistant">Office Assistant</option>
                <option value="Secretary">Secretary</option>
                <option value="Librarian">Librarian</option>
                <option value="Typist">Typist</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="gradeLevel" 
                placeholder="Enter your grade level"
                name='gradeLevel'
                value={gradeLevel}
                required
                onChange={(e) => {
                  setGradeLevel(+e.target.value);
                }}
              />
              <label htmlFor="gradeLevel">Grade Level</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="step" 
                placeholder="Enter your grade level step"
                name='step'
                value={step}
                required
                onChange={(e) => {
                  setStep(parseInt(e.target.value));
                }}
              />
              <label htmlFor="step">Step</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="firstAppointment" 
                name='firstAppointment'
                value={firstAppointment}
                required
                onChange={handleServiceDateChange}
              />
              <label htmlFor="firstAppointment">Date Of First Appointment</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="yearsInService" 
                name='yearsInService'
                value={yearsInService}
                required
                readOnly
              />
              <label htmlFor="yearsInService">Years In Service</label>
            </div>
            
            <div className="mb-3">
              <label htmlFor="qualification" className="form-label">
                What is your qualification?
              </label>
              <select
                className="form-select"
                id="qualification"
                name="qualification"
                value={qualification}
                required
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
              >
                <option value="" disabled>Your Qualification</option>
                <option value="SSDE">SSCE</option>
                <option value="OND">OND</option>
                <option value="NCE">NCE</option>
                <option value="HND">HND</option>
                <option value="BSc">B.Sc</option>
                <option value="BEd">B.Ed</option>
                <option value="PGDE">PGDE</option>
                <option value="BArts">B.Arts</option>
                <option value="MSc">M.Sc</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="discipline" 
                name='discipline'
                value={discipline}
                placeholder='What is your discipline?'
                required
                onChange={(e) => {
                  setDiscipline(e.target.value);
                }}
              />
              <label htmlFor="discipline">Discipline</label>
            </div>

            <div className="mb-3">
              <label htmlFor="currentPostingZoneId" className="form-label">
                What zone are you posted?
              </label>
              <select
                className="form-select"
                id="currentPostingZoneId"
                name="currentPostingZoneId"
                value={currentPostingZoneId}
                required
                onChange={(e) => {
                  setCurrentPostingZoneId(e.target.value);
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
              <label htmlFor="CurrentPostingSchoolId" className="form-label">
                School you currently work
              </label>
              <select
                className="form-select"
                id="currentPostingSchoolId"
                name="currentPostingSchoolId"
                value={currentPostingSchoolId}
                required
                onChange={(e) => {
                  setCurrentPostingSchoolId(e.target.value);
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
              <label className="form-label" htmlFor='prevSchsId'>
                Select previous schools you have been posted to
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

            <div className="form-floating mb-3">
              <textarea 
                name="publishedWork"
                id="publishedWork"
                placeholder='If available, describe your published work in few details ...'
                cols={40}
                rows={5}
                value={publishedWork}
                onChange={(e) => {setPublishedWork(e.target.value)}}
              >
              </textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="currentSubjectId" className="form-label">
                Select subject you teach
              </label>
              <select
                className="form-select"
                id="currentSubjectId"
                name="currentSubjectId"
                value={currentSubjectId}
                required
                onChange={(e) => {
                  setCurrentSubjectId(e.target.value);
                }}
              >
                <option value="" disabled>Select A Subject</option>
                {subjectsList?.map((subject) => (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor='otherSubjectsIds'>
                Select other subjects you have taught
              </label>
              {subjectsList?.map(subject => (
                <div key={subject.subjectId}>
                  <label>
                    <input
                      type="checkbox" 
                      id="otherSubjectsIds" 
                      value={subject.subjectId}
                      checked={otherSubjects.includes(subject.subjectId)} 
                      onChange={handleSubjectChange}
                    />
                    {subject.subjectName}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
        
        <button type="submit">{isFirstPartComplete ? 'Submit' : 'Continue'}</button>
      </form>
    </div>
  )
}

export default ParentProfile