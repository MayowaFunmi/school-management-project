interface SchoolIdList {
  schoolId: string
}

interface SubjectList {
  subjectName: string
}

export interface TeachingStaff {
  userId: string
  title: string
  middleName: string
  dateOfBirth: string
  gender: string
  age: number
  stateOfOrigin: string
  lgaOfOrigin: string
  address: string
  religion: string
  maritalStatus: string
  aboutMe: string
  designation: string
  gradeLevel: string
  firstAppointment: string
  yearsInService: string
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingSchoolId: string
  previousSchoolsIds: SchoolIdList[]
  createdDate: string
  updatedDate: string
  publishedWork: string
  currentSubjectId: string
  OtherSubjects: SubjectList[]
}

export interface Response {
  status: string
  message: string
  data: TeachingStaff
}
