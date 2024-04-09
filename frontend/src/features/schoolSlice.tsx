import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchool, SchoolSearch } from "../models/userModel";
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
	}
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

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    clearSchoolData: (state) => {
			return { ...initialState };
		},
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
					// return {
					// 	...state, pageSchools: schData, status: "success", currentPage: schData.currentPage, totalPages: schData.totalPages
					// }
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
  }
})

export const { clearSchoolData } = schoolSlice.actions;
export default schoolSlice.reducer;