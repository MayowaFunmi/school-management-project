import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchool, SchoolSearch, UserList, UserSearch } from "../models/userModel";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: ISchool = {
	allSchools: [],
	schMsg: "",
	allSchoolIds: [],
	schIdMsg: "",
	currentPage: 0,
	totalPages: 0,
	status: "",
	pageSchools: {
		schools: [],
		totalPages: 0,
		currentPage: 0,
		pagesLeft: 0
	},
	pageUsers: {
		users: [],
		totalPages: 0,
		currentPage: 0,
		pagesLeft: 0
	},
	userCurrentPage: 0,
	userTotalPages: 0,
	userStatus: "",
	organizationSChool: {
		schoolId: "",
		adminId: "",
		admin: {
			id: "",
			userName: "",
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			percentageCompleted: 0,
			uniqueId: "",
			createdAt: ""
		},
		organizationUniqueId: "",
		schoolUniqueId: "",
		zoneId: "",
		name: "",
		address: "",
		state: "",
		localGovtArea: "",
		createdAt: ""
	},
	orgSchMsg: "",
	teachersCount: 0,
	nonTeachersCount: 0,
	parentsCount: 0,
	studentsCount: 0,
	teachersCountMsg: "",
	nonTeachersCountMsg: "",
	parentsCountMsg: "",
	studentsCountMsg: "",
	teachersList: [],
	nonTeachersList: [],
	parentsList: [],
	studentsList: [],
	teachersListMsg: "",
	nonTeachersListMsg: "",
	parentsListMsg: "",
	studentsListMsg: "",
	tCurrentPage: 0,
	nCurrentPage: 0,
	pCurrentPage: 0,
	sCurrentPage: 0,
	tTotalPages: 0,
	nTotalPages: 0,
	pTotalPages: 0,
	sTotalPages: 0
}

export const getSchoolsInZone = createAsyncThunk(
	'school/getSchoolsInZone',
	async (data: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-schools-in-zone/${data}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getOrganizationSchools = createAsyncThunk(
	'school/getOrganizationSchools',
	async (searchData: SchoolSearch, thunkApi) => {
		try {
      const { organizationId, page, pageSize } = searchData;
      const response = await axios.get(`${baseUrl}/api/admin/get-schools-in-organization/${organizationId}`, {
        params: { page, pageSize },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const teachersInSchool = createAsyncThunk(
	'school/teachersInSchool',
	async (userData: UserList, thunkApi) => {
		try {
      const { schoolId, page, pageSize } = userData;
      const response = await axios.get(`${baseUrl}/api/school/get-teachers-in-school/${schoolId}`, {
        params: { page, pageSize },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const nonTeachersInSchool = createAsyncThunk(
	'school/nonTeachersInSchool',
	async (userData: UserList, thunkApi) => {
		try {
      const { schoolId, page, pageSize } = userData;
      const response = await axios.get(`${baseUrl}/api/school/get-non-teachers-in-school/${schoolId}`, {
        params: { page, pageSize },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const parentsInSchool = createAsyncThunk(
	'school/parentsInSchool',
	async (userData: UserList, thunkApi) => {
		try {
      const { schoolId, page, pageSize } = userData;
      const response = await axios.get(`${baseUrl}/api/school/get-parents-in-school/${schoolId}`, {
        params: { page, pageSize },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const studentsInSchool = createAsyncThunk(
	'school/studentsInSchool',
	async (userData: UserList, thunkApi) => {
		try {
      const { schoolId, page, pageSize } = userData;
      const response = await axios.get(`${baseUrl}/api/school/get-students-in-school/${schoolId}`, {
        params: { page, pageSize },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getOrganizationUsersByRole = createAsyncThunk(
	'school/getOrganizationUsersByRole',
	async (searchData: UserSearch, thunkApi) => {
		try {
      const { organizationId, roleName, page, userPageSize } = searchData;
			const pageSize = userPageSize;
      const response = await axios.get(`${baseUrl}/api/admin/get-organization-users-by-role/${organizationId}`, {
        params: { roleName, page, pageSize },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolsByIds = createAsyncThunk(
	'school/getSchoolsByIds',
	async (schoolIds: string[], thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/get-schools-by-id`, {
				params: { schoolIds: schoolIds.join(',')}
			})
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolDetails = createAsyncThunk(
	'school/getSchoolDetails',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/get-school-by-id/${schoolId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolTeachersCount = createAsyncThunk(
	'school/getSchoolTeachersCount',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/school-teaching-staff-count/${schoolId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolNonTeachersCount = createAsyncThunk(
	'school/getSchoolNonTeachersCount',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/school-non-teaching-staff-count/${schoolId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolParentsCount = createAsyncThunk(
	'school/getSchoolParentsCount',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/school-parents-count/${schoolId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolStudentsCount = createAsyncThunk(
	'school/getSchoolStudentsCount',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/school-students-count/${schoolId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    clearSchoolData: (state) => {
			return { ...initialState };
		},
		resetOranizationSchool: (state) => {
			state.currentPage = 0;
			state.totalPages = 0;
			state.status ="";
			state.pageSchools = {
				schools: [],
				totalPages: 0,
				currentPage: 0,
				pagesLeft: 0
			}
		},
		resetOranizationUsers: (state) => {
			state.userCurrentPage = 0;
			state.userTotalPages = 0;
			state.userStatus ="";
			state.pageUsers = {
				users: [],
				totalPages: 0,
				currentPage: 0,
				pagesLeft: 0
			}
		},
		resetSchoolsById: (state) => {
			state.allSchoolIds = []
			state.schIdMsg = ""
		},
		resetOrganizationSchool: (state) => {
			state.organizationSChool = null
			state.orgSchMsg = ""
		},
		clearSchoolUsers: (state) => {
			state.teachersList = []
			state.nonTeachersList = []
			state.parentsList = []
			state.studentsList = []
			state.teachersListMsg = ""
			state.nonTeachersListMsg = ""
			state.parentsListMsg = ""
			state.studentsListMsg = ""
			state.tCurrentPage = 0
			state.nCurrentPage = 0
			state.pCurrentPage = 0
			state.sCurrentPage = 0
			state.tTotalPages = 0
			state.nTotalPages = 0
			state.pTotalPages = 0
			state.sTotalPages = 0
		}
  },
  extraReducers: (builder) => {
    builder
			.addCase(getSchoolsInZone.pending, (state) => {
				return { ...state, schMsg: "pending" }
			})
			.addCase(getSchoolsInZone.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					return {
						...state, allSchools: schData.data.schools, schMsg: "success"
					}
				}
			})
			.addCase(getSchoolsInZone.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allSchools: schData.data, schMsg: "rejected"
					}
				}
			})

		builder
			.addCase(getSchoolsByIds.pending, (state) => {
				return { ...state, schIdMsg: "pending" }
			})
			.addCase(getSchoolsByIds.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					return {
						...state, allSchoolIds: schData.data, schIdMsg: "success"
					}
				}
			})
			.addCase(getSchoolsByIds.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allSchoolIds: schData.data, schIdMsg: "rejected"
					}
				}
			})

		builder
			.addCase(getOrganizationSchools.pending, (state) => {
				return { ...state, staus: "pending" }
			})
			.addCase(getOrganizationSchools.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload.data !== null) {
					const schData = action.payload.data;
					state.pageSchools = schData;
					state.status = "success";
					if (schData !== null) {
						state.currentPage = schData.currentPage;
						state.totalPages = schData.totalPages;
					}
				}
			})
			.addCase(getOrganizationSchools.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload.status === "notFound") {
					const schData = action.payload;
					return {
						...state, pageSchools: schData, status: "rejected", currentPage: 0, totalPages: 0
					}
				}
			})

		builder
			.addCase(getOrganizationUsersByRole.pending, (state) => {
				return { ...state, userStatus: "pending" }
			})
			.addCase(getOrganizationUsersByRole.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload.data !== null) {
					const userData = action.payload.data;
					state.pageUsers = userData;
					state.userStatus = "success";
					if (userData !== null) {
						state.userCurrentPage = userData.currentPage;
						state.userTotalPages = userData.totalPages;
					}
				}
			})
			.addCase(getOrganizationUsersByRole.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload.status === "notFound") {
					const schData = action.payload;
					return {
						...state, pageUsers: schData, userStatus: "rejected", userCurrentPage: 0, userTotalPages: 0
					}
				}
			})

		builder
			.addCase(getSchoolDetails.pending, (state) => {
				return { ...state, orgSchMsg: "pending" }
			})
			.addCase(getSchoolDetails.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					state.organizationSChool = schData.data
					state.orgSchMsg = "success"
				}
			})
			.addCase(getSchoolDetails.rejected, (state, action: PayloadAction<any>) => {
				state.orgSchMsg = "rejected"
			})

		builder
			.addCase(getSchoolTeachersCount.pending, (state) => {
				state.teachersCountMsg = "pending"
			})
			.addCase(getSchoolTeachersCount.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					state.teachersCount = schData.data
					state.teachersCountMsg = "success"
				}
			})
			.addCase(getSchoolTeachersCount.rejected, (state, action: PayloadAction<any>) => {
				state.teachersCountMsg = "rejected"
			})

		builder
			.addCase(getSchoolNonTeachersCount.pending, (state) => {
				state.nonTeachersCountMsg = "pending"
			})
			.addCase(getSchoolNonTeachersCount.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					state.nonTeachersCount = schData.data
					state.nonTeachersCountMsg = "success"
				}
			})
			.addCase(getSchoolNonTeachersCount.rejected, (state, action: PayloadAction<any>) => {
				state.nonTeachersCountMsg = "rejected"
			})

		builder
			.addCase(getSchoolParentsCount.pending, (state) => {
				state.parentsCountMsg = "pending"
			})
			.addCase(getSchoolParentsCount.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					state.parentsCount = schData.data
					state.parentsCountMsg = "success"
				}
			})
			.addCase(getSchoolParentsCount.rejected, (state, action: PayloadAction<any>) => {
				state.parentsCountMsg = "rejected"
			})

		builder
			.addCase(getSchoolStudentsCount.pending, (state) => {
				state.studentsCountMsg = "pending"
			})
			.addCase(getSchoolStudentsCount.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					state.studentsCount = schData.data
					state.studentsCountMsg = "success"
				}
			})
			.addCase(getSchoolStudentsCount.rejected, (state, action: PayloadAction<any>) => {
				state.studentsCountMsg = "rejected"
			})

		builder
			.addCase(teachersInSchool.pending, (state) => {
				return { ...state, teachersListMsg: "pending" }
			})
			.addCase(teachersInSchool.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload.data !== null) {
					const userData = action.payload.data;
					state.teachersList = userData.teachers;
					state.teachersListMsg = "success";
					if (userData !== null) {
						state.tCurrentPage = userData.currentPage;
						state.tTotalPages = userData.totalPages;
					}
				}
			})
			.addCase(teachersInSchool.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const userData = action.payload;
					return {
						...state, teachersList: userData, teachersListMsg: "rejected"
					}
				}
			})

		builder
			.addCase(nonTeachersInSchool.pending, (state) => {
				return { ...state, nonTeachersListMsg: "pending" }
			})
			.addCase(nonTeachersInSchool.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload.data !== null) {
					const userData = action.payload.data;
					state.nonTeachersList = userData.nonTeachers;
					state.nonTeachersListMsg = "success";
					if (userData !== null) {
						state.nCurrentPage = userData.currentPage;
						state.nTotalPages = userData.totalPages;
					}
				}
			})
			.addCase(nonTeachersInSchool.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const userData = action.payload;
					return {
						...state, nonTeachersList: userData, nonTeachersListMsg: "rejected"
					}
				}
			})

		builder
			.addCase(parentsInSchool.pending, (state) => {
				return { ...state, parentsListMsg: "pending" }
			})
			.addCase(parentsInSchool.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload.data !== null) {
					const userData = action.payload.data;
					state.parentsList = userData.parents;
					state.parentsListMsg = "success";
					if (userData !== null) {
						state.pCurrentPage = userData.currentPage;
						state.pTotalPages = userData.totalPages;
					}
				}
			})
			.addCase(parentsInSchool.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const userData = action.payload;
					return {
						...state, parentsList: userData, parentsListMsg: "rejected"
					}
				}
			})

		builder
			.addCase(studentsInSchool.pending, (state) => {
				return { ...state, studentsListMsg: "pending" }
			})
			.addCase(studentsInSchool.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload.data !== null) {
					const userData = action.payload.data;
					state.studentsList = userData.students;
					state.studentsListMsg = "success";
					if (userData !== null) {
						state.sCurrentPage = userData.currentPage;
						state.sTotalPages = userData.totalPages;
					}
				}
			})
			.addCase(studentsInSchool.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const userData = action.payload;
					return {
						...state, studentsList: userData, studentsListMsg: "rejected"
					}
				}
			})
  }
})

export const { 
	clearSchoolData,
	resetOranizationSchool,
	resetOranizationUsers,
	resetSchoolsById,
	resetOrganizationSchool,
	clearSchoolUsers
} = schoolSlice.actions;
export default schoolSlice.reducer;