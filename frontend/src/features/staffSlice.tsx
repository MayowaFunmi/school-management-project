import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl, getAxiosConfig } from "../config/Config";
import axios from "axios";
import { Response } from "../models/staffModel";

const initialState: Response = {
  status: "",
  message: "",
  data: {
    userId: "",
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
    yearsInService: "",
    qualification: "",
    discipline: "",
    currentPostingZoneId: "",
    currentPostingSchoolId: "",
    previousSchoolsIds: [],
    createdDate: "",
    updatedDate: "",
    publishedWork: "",
    currentSubjectId: "",
    OtherSubjects: [],
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
    },
    currentPostingZone: {
      zoneId: "",
      organizationId: "",
      name: "",
      schools: [],
      localGovtArea: [],
      createdAt: "",
      updatedAt: ""
    },
    currentPostingSchool: {
      schoolId: "",
      organizationUniqueId: "",
      schoolUniqueId: "",
      zoneId: "",
      name: "",
      address: "",
      localGovtArea: "",
      createdAt: ""
    },
    currentSubject: {
      subjectName: ""
    },
    profilePicture: ""
  },
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
    yearsInService: "",
    qualification: "",
    discipline: "",
    currentPostingZoneId: "",
    currentPostingZone: {
      zoneId: "",
      organizationId: "",
      name: "",
      schools: [],
      localGovtArea: [],
      createdAt: "",
      updatedAt: ""
    },
    currentPostingSchoolId: "",
    currentPostingSchool: {
      schoolId: "",
      organizationUniqueId: "",
      schoolUniqueId: "",
      zoneId: "",
      name: "",
      address: "",
      localGovtArea: "",
      createdAt: ""
    },
    previousSchoolsIds: [],
    createdDate: "",
    updatedDate: "",
    profilePicture: ""
  },
  staffStatus: "",
  staffMessage: ""
}

export const getTeacherProfile = createAsyncThunk(
  'staff/getTeacherProfile',
  async (staffId: string, thunkApi) => {
    try {
      const endpoint = `${baseUrl}/api/staff/get-teaching-staff-by-id/${staffId}`
      const response = await axios.get(endpoint, getAxiosConfig())
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const getNonTeacherProfile = createAsyncThunk(
  'staff/getNonTeacherProfile',
  async (staffId: string, thunkApi) => {
    try {
      const endpoint = `${baseUrl}/api/staff/get-non-teaching-staff-by-id/${staffId}`
      const response = await axios.get(endpoint, getAxiosConfig())
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    clearProfileData: (state) => {
			return { ...initialState, };
		}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherProfile.pending, (state) => {
        return { ...state, message: "Fetching staff profile data", status: "pending" }
      })
      .addCase(getTeacherProfile.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          const result = action.payload;

          return {
            ...state, message: result.message, data: result.data, status: "success"
          }
        }
      })
      .addCase(getTeacherProfile.rejected, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          const result = action.payload;

          return {
            ...state, message: result.message, data: result.data, status: "rejected"
          }
        }
      })

      builder
      .addCase(getNonTeacherProfile.pending, (state) => {
        return { ...state, staffMessage: "Fetching staff profile data", staffStatus: "pending" }
      })
      .addCase(getNonTeacherProfile.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          const result = action.payload;

          return {
            ...state, staffMessage: result.message, staffData: result.data, staffStatus: "success"
          }
        }
      })
      .addCase(getNonTeacherProfile.rejected, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          const result = action.payload;

          return {
            ...state, staffMessage: result.message, staffData: result.data, staffStatus: "rejected"
          }
        }
      })
  }
})

export const { clearProfileData } = staffSlice.actions;
export default staffSlice.reducer;