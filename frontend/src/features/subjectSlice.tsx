import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISubject } from "../models/userModel";
import axios from "axios";
import { baseUrl } from "../config/Config";

const initialState: ISubject = {
  allSubjects: [],
  subMsg: ""
}

export const getAllSubjects = createAsyncThunk(
	'subject/getAllSubjects',
	async (_, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-all-subjects`)
      console.log(response.data)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
			.addCase(getAllSubjects.pending, (state) => {
				return { ...state, subMsg: "pending" }
			})
			.addCase(getAllSubjects.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const subData = action.payload;
          console.log("subjects = ", subData)
					return {
						...state, allSubjects: subData.data, subMsg: "success"
					}
				}
			})
			.addCase(getAllSubjects.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allSubjects: schData.data, subMsg: "rejected"
					}
				}
			})
  }
})

export default subjectSlice.reducer;