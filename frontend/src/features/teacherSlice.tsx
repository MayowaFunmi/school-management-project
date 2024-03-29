import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITeacherProfile, NonTSProfileData, TSProfileData } from "../models/userModel";
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
    otherSubjectsIds: [],
    user: {
      id: "",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      uniqueId: "",
      createdAt: "",
      percentageCompleted: 0
    }
  },
  teacherMsg: "",
  msg: "",
  staffData: {
    userId: "",
    user: {
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
    previousSchoolsIds: []
  },
  staffMsg: "",
  message: ""
}

export const createTeacherProfile = createAsyncThunk(
	'teacher/createTeacherProfile',
	async (data: TSProfileData, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/staff/add-teaching-staff-profile`, data, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const createNonTeacherProfile = createAsyncThunk(
	'teacher/createNonTeacherProfile',
	async (data: NonTSProfileData, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/staff/add-non-teaching-staff-profile`, data, getAxiosConfig())
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

    builder
			.addCase(createNonTeacherProfile.pending, (state) => {
				return { ...state, staffMsg: "pending" }
			})
			.addCase(createNonTeacherProfile.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const profile = action.payload;
					return {
						...state, staffData: profile.data, staffMsg: "success", message: profile.message
					}
				}
			})
			.addCase(createNonTeacherProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, staffData: profile.data, staffMsg: "rejected", message: profile.message
					}
				}
			})
  }
})

export default teacherSlice.reducer;