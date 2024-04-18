import { IParent } from "./parentModels";
import { NonTeachingStaff, TeachingStaff } from "./staffModel";
import { ClassArms, IStudent } from "./studentModel";

export type UserLogin = {
    message: string;
    data: string
}

export interface OrgData {
  organizationId: string
  organizationUniqueId: string
  adminId: string
  admin: User
  name: string
  createdAt: string
}

export interface OrganizationData {
  data: OrgData[]
}

//
export interface Organization {
	_id: string;
	userId: Users;
	organizationName: string;
	organizationUniqueId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Zone {
	zoneId: string;
	organizationId: string;
	name: string;
  schools: School[]
  localGovtArea: string[]
	createdAt: string;
	updatedAt: string;
}

export interface School {
  schoolId: string
  adminId: string
  admin: User
  organizationUniqueId: string
  schoolUniqueId: string
  zoneId: string
  name: string
  address: string
  state: string
  localGovtArea: string
  createdAt: string
}

export interface Subject {
  subjectId: string
  subjectName: string
}

export interface IZone {
  allZones: Zone[]
	allZoneMsg: string
  orgZones: Zone[]
  orgZonesMsg: string
}

export interface PaginationResponse {
  schools: School[]
  totalPages: number
  currentPage: number
  pagesLeft: number
}

export interface UserPaginationResponse {
  users: User[]
  totalPages: number
  currentPage: number
  pagesLeft: number
}

export interface ISchool {
  allSchools: School[]
  schMsg: string
  allSchoolIds: School[]
  schIdMsg: string
  pageSchools: PaginationResponse
  currentPage: number
  totalPages: number
  status: string
  pageUsers: UserPaginationResponse
  userCurrentPage: number
  userTotalPages: number
  userStatus: string
  organizationSChool: School | null
  orgSchMsg: string
  teachersCount: number
  teachersCountMsg: string
  nonTeachersCount: number
  nonTeachersCountMsg: string
  parentsCount: number
  parentsCountMsg: string
  studentsCount: number
  studentsCountMsg: string
  teachersList: TeachingStaff[]
  nonTeachersList: NonTeachingStaff[]
  parentsList: IParent[]
  studentsList: IStudent[]
  teachersListMsg: string
  nonTeachersListMsg: string
  parentsListMsg: string
  studentsListMsg: string
  tCurrentPage: number
  nCurrentPage: number
  pCurrentPage: number
  sCurrentPage: number
  tTotalPages: number
  nTotalPages: number
  pTotalPages: number
  sTotalPages: number
}

export interface ISubject {
  allSubjects: Subject[]
  subMsg: string
  allSubjectsIds: Subject[]
  subIdMsg: string
}

export interface IOrgSchools {
  allOrgSch: School[]
  orgSchs: string
}

export interface User 
  {
    id: string
    userName: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    percentageCompleted: number
    uniqueId: string
    createdAt: string
  }
export interface UserRoles 
  {
    id: string
    name: string
  }
export interface Users {
    user: User
    userRoles: UserRoles[]
  }
export interface Roles {
	roles: { _id: string, roleName: string}[]
}

export interface Data {
  loading: boolean
  status: string
	data: Users
	roles: Roles
	roleMsg: string
	orgMsg: string
	orgStatus: string
	organizations: OrgData[]
	checkOrgs: string
	organizationMsg: string
	allOrganizations: OrgData[]
	allOrgsMsg: string
	zone: Zone
	zoneMsg: string
  zoneStatus: string
}

export interface OrganizationZonesModalProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  allZones: Zone[];
  zoneMsg: string;
  org: OrgData;
}

export interface UserDetailsProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  user: UserWithRoles | null
  roleName: string
}

export interface AddZoneModalProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  org: OrgData;
}

export interface AddClassProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  schoolId: string | undefined
}

export interface RoleData {
  id: string
  name: string
}
export interface Role {
    status: string
    message: string,
    data: RoleData[]
}
export interface Values { uniqueId: string, roleName: string }
export interface SchoolSearch { organizationId: string, page: number, pageSize?: number }
export interface UserList { schoolId: string, page: number, pageSize?: number }
export interface UserSearch { organizationId: string, roleName: string, page: number, userPageSize?: number }
export interface Values2 { uniqueId: string, roleName2: string }
export interface ZoneValues {
  adminId: string
  organizationUniqueId: string
  name: string
  state: string
  localGovtAreas: string[]
}

export interface TSProfile {
  userId: string
  user: User
  organizationUniqueId: string
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
  yearsInService: number
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingSchoolId: string
  previousSchoolsIds: string[]
  publishedWork: string
  currentSubjectId: string
  otherSubjectsIds: string[]
}

export interface NonTSProfile {
  userId: string
  user: User
  organizationUniqueId: string
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
  yearsInService: number
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingSchoolId: string
  previousSchoolsIds: string[]
}

export interface TSProfileData {
  userId: string
  organizationUniqueId: string
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
  yearsInService: number
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingSchoolId: string
  previousSchoolsIds: string[]
  publishedWork: string
  currentSubjectId: string
  otherSubjects: string[]
}

export interface NonTSProfileData {
  userId: string
  organizationUniqueId: string
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
  yearsInService: number
  qualification: string
  discipline: string
  currentPostingZoneId: string
  currentPostingSchoolId: string
  previousSchoolsIds: string[]
}

export interface ITeacherProfile {
  teacherData: TSProfile
  staffData: NonTSProfile
  teacherMsg: string
  staffMsg: string
  msg: string
  message: string
}

export interface SchoolData {
  adminId: string
  organizationUniqueId: string
  zoneId: string
  name: string
  address: string
  state: string
  localGovtArea: string
}

export interface UserWithRoles {
  user: User
  userRoles: string[]
  teacherProfile: TeachingStaff
  nonTeacherProfile: NonTeachingStaff
  adminTeacher: TeachingStaff
  adminNonTeacher: NonTeachingStaff
  parentProfile: IParent
  studentProfile: IStudent
}

export interface UserDetails {
  uniqueId: string, roleName: string | ""
}