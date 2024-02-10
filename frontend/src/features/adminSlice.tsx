import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosConfig, baseUrl } from "../config/Config";
import axios from "axios";
import { Data, Values, Values2, ZoneValues } from "../models/userModel";

const initialState: Data = {
	loading: false,
	status: "",
	data: {
	  user: {
			id: "",
			userName: "",
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			uniqueId: "",
			createdAt: ""
		},
		userRoles: []
	},
	roles: {
	  roles: [],
	},
	roleMsg: "",
	orgMsg: "",
	orgStatus: "",
	organizations: [],
	checkOrgs: "",
	organizationMsg: "",
	allOrganizations: [],
	allOrgsMsg: "",
	zone: {
		id: "",
		organizationId: "",
		name: "",
		createdAt: "",
		updatedAt: ""
	},
	// zone: {
	// 	_id: "",
	// 	organizationId: {
	// 		_id: "",
	// 		userId: {
	// 			_id: "",
	// 			username: "",
	// 			firstName: "",
	// 			lastName: "",
	// 			email: "",
	// 			roles: [],
	// 			uniqueId: "",
	// 			createdAt: "",
	// 		  },
	// 		organizationName: "",
	// 		organizationUniqueId: "",
	// 		createdAt: "",
	// 		updatedAt: ""
	// 	},
	// 	name: "",
	// 	createdAt: "",
	// 	updatedAt: ""
	// },
	zoneMsg: "",
	allZones: [],
	allZoneMsg: ""
  };

export const getUserDetails = createAsyncThunk(
    'admin/getUserDetails',
    async (data: string, thunkApi) => {
      try {
        const endpoint = `${baseUrl}/api/admin/get-user-by-unique-id/${data}`;
        const response = await axios.get(endpoint, axiosConfig);
        return response.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

export const addRoleToUser = createAsyncThunk(
	'admin/addRoleToUser',
	async (values: Values, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/role/add-role-to-user`, values, axiosConfig)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const removeRoleFromUser = createAsyncThunk(
	'admin/removeRoleFromUser',
	async (values: Values2, thunkApi) => {
		try {
			const response = await axios.delete(`${baseUrl}/api/role/remove-user-from-role`, { data: values });
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const createOrganization = createAsyncThunk(
	'admin/createOrganization',
	async (organizationName: string, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/admin/create-organization`, {organizationName}, axiosConfig)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const createZone = createAsyncThunk(
	'admin/createZone',
	async (values: ZoneValues, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/admin/add-zone`, values, axiosConfig)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getOrganizationZones = createAsyncThunk(
    'admin/getOrganizationZones',
    async (organizationId: string, thunkApi) => {
      try {
        const endpoint = `${baseUrl}/api/admin/get-all-organization-zones/${organizationId}`;
        const response = await axios.get(endpoint, axiosConfig);
        return response.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

export const getAdminOrganizations = createAsyncThunk(
	'admin/getAdminOrganizations',
	async(userId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-admin-organizations/${userId}`, axiosConfig);
			return response.data
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getAllOrganizations = createAsyncThunk(
	'admin/getAllOrganizations',
	async(_, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-all-organizations`, axiosConfig);
			return response.data
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		clearUserData: (state) => {
			return { ...initialState, };
		},
		resetAllZones: (state) => {
			state.allZones = [];
			state.allZoneMsg = "";
			state.zone = {
				id: "",
				organizationId: "",
				name: "",
				createdAt: "",
				updatedAt: ""
			};
			state.zoneMsg = ""
		  },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserDetails.pending, (state) => {
				return { ...state, loading: true, status: "pending" }
			})
			.addCase(getUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataRes = action.payload;

					return {
						...state, loading: false, data: dataRes.data, status: "success"
					}
				}
			})
			.addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataRes = action.payload;

					return {
						...state, loading: false, message: dataRes.message, status: "rejected"
					}
				}
			})
		builder
			.addCase(addRoleToUser.pending, (state) => {
				return { ...state, }
			})
			.addCase(addRoleToUser.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})
			.addCase(addRoleToUser.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})

		builder
			.addCase(removeRoleFromUser.pending, (state) => {
				return { ...state, }
			})
			.addCase(removeRoleFromUser.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})
			.addCase(removeRoleFromUser.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})
		builder
			.addCase(createOrganization.pending, (state) => {
				return { ...state, orgStatus: "pending" }
			})
			.addCase(createOrganization.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, orgMsg: dataMsg.message, orgStatus: "success"
					}
				}
			})
			.addCase(createOrganization.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, orgMsg: dataMsg.message, orgStatus: "rejected"
					}
				}
			})
		builder
			.addCase(getAdminOrganizations.pending, (state) => {
				return { ...state, checkOrgs: "pending" }
			})
			.addCase(getAdminOrganizations.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const orgData = action.payload;
					return {
						...state, organizations: orgData.data, checkOrgs: "success"
					}
				}
			})
			.addCase(getAdminOrganizations.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const orgData = action.payload;
					return {
						...state, organizations: orgData.data, checkOrgs: "rejected", organizationMsg: orgData.message
					}
				}
			})

		builder
			.addCase(getAllOrganizations.pending, (state) => {
				return { ...state, allOrgsMsg: "pending" }
			})
			.addCase(getAllOrganizations.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const orgData = action.payload;
					return {
						...state, allOrganizations: orgData.data, allOrgsMsg: orgData.message
					}
				}
			})
			.addCase(getAllOrganizations.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const orgData = action.payload;
					return {
						...state, allOrganizations: orgData.data, allOrgsMsg: "rejected"
					}
				}
			})

		builder
			.addCase(createZone.pending, (state) => {
				return { ...state, zoneMsg: "pending" }
			})
			.addCase(createZone.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const zoneData = action.payload;
					return {
						...state, zone: zoneData.data, zoneMsg: zoneData.message
					}
				}
			})
			.addCase(createZone.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const zoneData = action.payload;
					return {
						...state, zone: zoneData.data, zoneMsg: zoneData.message
					}
				}
			})

		builder
			.addCase(getOrganizationZones.pending, (state) => {
				return { ...state, allZoneMsg: "pending" }
			})
			.addCase(getOrganizationZones.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const zoneData = action.payload;
					return {
						...state, allZones: zoneData.data, allZoneMsg: "success"
					}
				}
			})
			.addCase(getOrganizationZones.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const zoneData = action.payload;
					return {
						...state, allZones: zoneData.data, allZoneMsg: "rejected"
					}
				}
			})
	}
})
export const { clearUserData, resetAllZones } = adminSlice.actions;
export default adminSlice.reducer;