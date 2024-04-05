import { School, User, Zone } from "./userModel"

export interface IParent {
  parentId: string
  userId: string
  user: User
  organizationUniqueId: string
  studentSchoolId: string
  studentSchool: School
  title: string
  gender: string
  relationshipType: string
  profilePicture: string
  address: string
  dateOfBirth: string
  age: number
  religion: string
  maritalStatus: string
  stateOfOrigin: string
  lgaOfOrigin: string
  lgaOfResidence: string
  occupation: string
}

export interface ParentState {
  parentMsg: string
  msg: string
  getParent: IParent
  getMessage: string
  getMsg: string
  schParents: IParent[]
  schParentMsg: string
}

export interface ParentInput {
  userId: string
  organizationUniqueId: string
  studentSchoolId: string
  title: string
  dateOfBirth: string
  age: number
  relationshipType: string
  gender: string
  address: string
  religion: string
  maritalStatus: string
  stateOfOrigin: string
  lgaOfOrigin: string
  lgaOfResidence: string
  occupation: string
}