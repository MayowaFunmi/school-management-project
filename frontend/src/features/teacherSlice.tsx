import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITeacherProfile, TSProfile } from "../models/userModel";
import { baseUrl, getAxiosConfig } from "../config/Config";
import axios from "axios";

const initialState: ITeacherProfile = {
  teacherData: {
    userId: "",
    organizationUniqueId: "",
    title: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    age: 0,
    stateOfOrigin: "",
    lgaOfOrigin: "",
    address: "",
    religion: "",
    maritalStatus: "",
    aboutMe: "",
    designation: "",
    gradeLevel: 0,
    step: 0,
    firstAppointment: "",
    yearsInService: 0,
    qualification: "",
    discipline: "",
    currentPostingZoneId: "",
    currentPostingSchoolId: "",
    previousSchoolsIds: [],
    publishedWork: "",
    currentSubjectId: "",
    otherSubjectsIds: []
  },
  teacherMsg: "",
  msg: ""
}

export const createTeacherProfile = createAsyncThunk(
	'teacher/createTeacherProfile',
	async (data: TSProfile, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/staff/add-teaching-staff-profile`, data, getAxiosConfig())
      console.log("teacher data = ", response.data)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
			.addCase(createTeacherProfile.pending, (state) => {
				return { ...state, teacherMsg: "pending" }
			})
			.addCase(createTeacherProfile.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const profile = action.payload;
					return {
						...state, teacherData: profile.data, teacherMsg: "success", msg: profile.message
					}
				}
			})
			.addCase(createTeacherProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, teacherData: profile.data, teacherMsg: "rejected", msg: profile.message
					}
				}
			})
  }
})

export default teacherSlice.reducer;