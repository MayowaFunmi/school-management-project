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
}

export interface ClassValues {
  schoolId: string, name: string, arm: number
}

export interface SchoolDept {
  schoolId: string, name: string
}