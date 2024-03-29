import { School, User, Zone } from "./userModel"

export interface SchoolIdList {
  schoolId: string
}

interface SubjectList {
  subjectName: string
}

export interface TeachingStaff {
  userId: string
  user: User
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
  gradeLevel: number
  step: number
  firstAppointment: string
  yearsInService: string
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingZone: Zone
  currentPostingSchoolId: string
  currentPostingSchool: School
  previousSchoolsIds: string[]
  createdDate: string
  updatedDate: string
  publishedWork: string
  currentSubjectId: string
  currentSubject: SubjectList
  OtherSubjects: string[]
  profilePicture: string
}

export interface NonTeachingStaff {
  userId: string
  user: User
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
  gradeLevel: number
  step: number
  firstAppointment: string
  yearsInService: string
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingZone: Zone
  currentPostingSchoolId: string
  currentPostingSchool: School
  previousSchoolsIds: string[]
  createdDate: string
  updatedDate: string
  profilePicture: string
}

export interface Response {
  status: string
  message: string
  data: TeachingStaff
  staffData: NonTeachingStaff
  staffStatus: string
  staffMessage: string
}
