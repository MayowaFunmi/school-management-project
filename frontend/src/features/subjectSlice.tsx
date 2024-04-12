import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISubject } from "../models/userModel";
import axios from "axios";
import { baseUrl } from "../config/Config";

const initialState: ISubject = {
	allSubjects: [],
	subMsg: "",
	allSubjectsIds: [],
	subIdMsg: ""
}

export const getAllSubjects = createAsyncThunk(
	'subject/getAllSubjects',
	async (_, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-all-subjects`)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSubjectsByIds = createAsyncThunk(
	'subject/getSubjectsByIds',
	async (subjectIds: string[], thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/get-subjects-by-id`, {
				params: { subjectIds: subjectIds.join(',')}
			})
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
		clearSubjectsByIds: (state) => {
			state.allSubjectsIds = []
			state.subIdMsg = ""
		}
  },
  extraReducers: (builder) => {
    builder
			.addCase(getAllSubjects.pending, (state) => {
				return { ...state, subMsg: "pending" }
			})
			.addCase(getAllSubjects.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const subData = action.payload;
					return {
						...state, allSubjects: subData, subMsg: "success"
					}
				}
			})
			.addCase(getAllSubjects.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allSubjects: schData, subMsg: "rejected"
					}
				}
			})

		builder
			.addCase(getSubjectsByIds.pending, (state) => {
				return { ...state, subIdMsg: "pending" }
			})
			.addCase(getSubjectsByIds.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const schData = action.payload;
					return {
						...state, allSubjectsIds: schData.data, subIdMsg: "success"
					}
				}
			})
			.addCase(getSubjectsByIds.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const schData = action.payload;
					return {
						...state, allSubjectsIds: schData.data, subIdMsg: "rejected"
					}
				}
			})
  }
})

export const { clearSubjectsByIds } = subjectSlice.actions;
export default subjectSlice.reducer;