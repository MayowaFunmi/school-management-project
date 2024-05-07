import { IParent } from "./parentModels";
import { School, User, Zone } from "./userModel";

export interface Department {
  departmentId: string
  schoolId: string
  name: string
}

export interface ClassArms {
  classArmId: string
  name: string
  schoolId: string
  studentClassId: string
  departmentId: string
}

export interface IStudent {
  userId: string
  user: User
  organizationUniqueId: string
  middleName: string
  admissionNumber: string
  admissionYear: string
  schoolZoneId: string
  schoolZone: Zone
  currentSchoolId: string
  currentSchool: School
  departmentId: string
  department: Department
  studentClassId: string
  studentClass: ClassArms
  previousSchoolsIds: string[]
  gender: string
  dateOfBirth: string
  age: number
  address: string
  religion: string
  parentId: string
  parent: IParent
  profilePicture: string
}

export interface StudentState {
  studentData: IStudent
  setMessage: string
  setMsg: string
  getMessage: string
  getMsg: string
  departments: Department[]
  getDept: string
  classArms: ClassArms[]
  getClass: string
}

export interface StudentInput {
  userId: string
  organizationUniqueId: string
  middleName: string
  admissionNumber: string
  admissionYear: string
  schoolZoneId: string
  currentSchoolId: string
  departmentId: string
  studentClassId: string
  previousSchoolsIds: string[]
  gender: string
  dateOfBirth: string
  age: number
  address: string
  religion: string
  parentId: string
}

export interface IClass {
  classArms: ClassArms[]
  classMsg: string
  addClass: ClassArms
  addClassMsg: string
  addDeptMsg: string
  msg: string
  getStdentClass: IStudent[]
  getStdentClassMsg: string
  getAllStdentClass: IStudent[]
  getAllStdentClassMsg: string
  studentCurrentPage: number
  studentTotalPages: number
  scoreData: ScoreData
  scoreMsg: string
  resultData: ClassStudentsScores[]
  resultMsg: string
}

export interface ClassValues {
  schoolId: string, name: string, arm: number
}

export interface SchoolDept {
  schoolId: string, name: string
}

export interface ScoreDto {
  studentId: string
  caTest1: number | 0
  caTest2: number | 0
  caTest3: number | 0
  exam: number | 0
}

export interface ScoreData {
  classId: string;
  subjectId: string;
  sessionId: string
  term: string;
  studentsScores: ScoreDto[]
}

export interface StudentData {
  uniqueId: string
  lastName: string
  firstName: string
  middleName: string
  admissionnumber: string
}

export interface ClassStudentsScores {
  studentId: string
  studentData: StudentData
  caTest1: number
  caTest2: number
  caTest3: number
  exam: number
  total: number
}

export interface ResultQuery {
  sessionId: string
  classId: string
  subjectId: string
  term: string
}

export interface Sessions {
  schoolSessionId: string
  name: string
  sessionStarts: string
  sessionEnds: string
}