import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchool } from "../models/userModel";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: ISchool= {
  allSchools: [],
  schMsg: ""
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
  }
})

export const { clearSchoolData } = schoolSlice.actions;
export default schoolSlice.reducer;