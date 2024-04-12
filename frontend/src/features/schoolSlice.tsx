import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchool, SchoolSearch, UserSearch } from "../models/userModel";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: ISchool= {
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
	orgSchMsg: ""
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
  }
})

export const { 
	clearSchoolData,
	resetOranizationSchool,
	resetOranizationUsers,
	resetSchoolsById,
	resetOrganizationSchool 
} = schoolSlice.actions;
export default schoolSlice.reducer;