import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrgSchools } from "../models/userModel";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: IOrgSchools = {
  allOrgSch: [],
  orgSchs: ""
}

export const getSchoolsInOrganization = createAsyncThunk(
	'organization/getSchoolsInOrganization',
	async (data: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-schools-in-organization/${data}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    clearOrgSchData: (state) => {
			return { ...initialState, };
		}
  },
  extraReducers: (builder) => {
    builder
			.addCase(getSchoolsInOrganization.pending, (state) => {
				return { ...state, orgSchs: "pending" }
			})
			.addCase(getSchoolsInOrganization.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allOrgSch: schData.data.schools, orgSchs: "success"
					}
				}
			})
			.addCase(getSchoolsInOrganization.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allOrgSch: schData.data, orgSchs: "rejected"
					}
				}
			})
  }
})

export const { clearOrgSchData } = organizationSlice.actions;
export default organizationSlice.reducer;