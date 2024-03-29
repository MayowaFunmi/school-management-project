import { School, User } from "./userModel"

export interface IParent {
  userId: string
  user: User
  schoolId: string
  school: School
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
  parentData: IParent
  parentMsg: string
  msg: string
  getParent: IParent
  getMessage: string
  getMsg: string
}

export interface ParentInput {
  userId: string
  schoolId: string
  title: string
  address: string
  religion: string
  maritalStatus: string
  stateOfOrigin: string
  lgaOfOrigin: string
  lgaOfResidence: string
  occupation: string
}