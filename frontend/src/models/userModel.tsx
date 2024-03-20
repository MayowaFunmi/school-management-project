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
	createdAt: string;
	updatedAt: string;
}

// export interface Users {
// 	id: string
// 	username: string
// 	firstName: string
// 	lastName: string
// 	email: string
// 	phoneNumber: string
// 	roles: { roleName: string }[]
// 	uniqueId: string
// 	createdAt: string
// }
export interface User 
  {
    id: string
    userName: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    //roles: { roleName: string }[];
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
	allZones: Zone[]
	allZoneMsg: string
}

export interface OrganizationZonesModalProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  allZones: Zone[];
  zoneMsg: string;
  org: Organization;
}

export interface AddZoneModalProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  org: Organization;
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
export interface SchoolSearch { zoneId: string, page: number, pageSize: number }
export interface Values2 { uniqueId: string, roleName2: string }
export interface ZoneValues { organizationUniqueId: string, zoneName: string }