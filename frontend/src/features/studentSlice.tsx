import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentInput, StudentState } from "../models/studentModel";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: StudentState = {
  studentData: {
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
    middleName: "",
    admissionNumber: "",
    admissionYear: "",
    schoolZoneId: "",
    schoolZone: {
      zoneId: "",
      organizationId: "",
      name: "",
      schools: [],
      localGovtArea: [],
      createdAt: "",
      updatedAt: ""
    },
    currentSchoolId: "",
    currentSchool: {
      schoolId: "",
      organizationUniqueId: "",
      schoolUniqueId: "",
      zoneId: "",
      name: "",
      address: "",
      localGovtArea: "",
      createdAt: "",
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
      state: ""
    },
    departmentId: "",
    department: {
      departmentId: "",
      schoolId: "",
      name: ""
    },
    studentClassId: "",
    studentClass: {
      classArmId: "",
      name: "",
      schoolId: "",
      studentClassId: "",
      departmentId: ""
    },
    previousSchoolsIds: [],
    gender: "",
    dateOfBirth: "",
    age: 0,
    address: "",
    religion: "",
    parentId: "",
    parent: {
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
      studentSchoolId: "",
      studentSchool: {
        schoolId: "",
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        localGovtArea: "",
        createdAt: "",
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
        state: ""
      },
      title: "",
      gender: "",
      relationshipType: "",
      profilePicture: "",
      address: "",
      dateOfBirth: "",
      age: 0,
      religion: "",
      maritalStatus: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      lgaOfResidence: "",
      occupation: "",
      parentId: ""
    },
    profilePicture: ""
  },
  setMessage: "",
  setMsg: "",
  getMessage: "",
  getMsg: "",
  departments: [],
  getDept: "",
  classArms: [],
  getClass: ""
}

export const createStudentProfile = createAsyncThunk(
	'student/createStudentProfile',
	async (data: StudentInput, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/student/create-student-profile`, data, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getStudentProfile = createAsyncThunk(
  'studnet/getStudentProfile',
  async (studentId: string, thunkApi) => {
    try {
      const endpoint = `${baseUrl}/api/student/get-student-profile/${studentId}`
      const response = await axios.get(endpoint, getAxiosConfig())
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const getSchoolDepatments = createAsyncThunk(
	'student/getSchoolDepatments',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-school-departments/${schoolId}`)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getSchoolClasses = createAsyncThunk(
	'student/getSchoolClasses',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/admin/get-claases-in-school/${schoolId}`)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearStudentData: (state) => {
      return { ...initialState }
    },
    resetDepartment: (state) => {
      state.departments = []
      state.getDept = ""
    }
  },
  extraReducers: (builder) => {
    builder
			.addCase(createStudentProfile.pending, (state) => {
				return { ...state, setMessage: "pending" }
			})
			.addCase(createStudentProfile.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const profile = action.payload;
					return {
						...state, setMessage: "success", setMsg: profile.message
					}
				}
			})
			.addCase(createStudentProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, setMessage: "rejected", setMsg: profile.message
					}
				}
			})

    builder
			.addCase(getStudentProfile.pending, (state) => {
				return { ...state, getMessage: "pending" }
			})
			.addCase(getStudentProfile.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const profile = action.payload;
					return {
						...state, studentData: profile.data, getMessage: "success", getMsg: profile.message
					}
				}
			})
			.addCase(getStudentProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, studentData: profile.data, getMessage: "rejected", getMsg: profile.message
					}
				}
			})

    builder
			.addCase(getSchoolDepatments.pending, (state) => {
				return { ...state, getDept: "pending" }
			})
			.addCase(getSchoolDepatments.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const depts = action.payload;
					return {
						...state, departments: depts.data, getDept: "success"
					}
				}
			})
			.addCase(getSchoolDepatments.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const depts = action.payload;
					return {
						...state, departments: depts.data, getDept: "rejected"
					}
				}
			})

    builder
			.addCase(getSchoolClasses.pending, (state) => {
				return { ...state, getClass: "pending" }
			})
			.addCase(getSchoolClasses.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const depts = action.payload;
					return {
						...state, classArms: depts.data, getClass: "success"
					}
				}
			})
			.addCase(getSchoolClasses.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const depts = action.payload;
					return {
						...state, classArms: depts.data, getClass: "rejected"
					}
				}
			})
  }
})

export const { clearStudentData, resetDepartment } = studentSlice.actions;
export default studentSlice.reducer;