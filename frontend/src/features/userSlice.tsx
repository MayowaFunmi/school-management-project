import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAxiosConfig, baseUrl } from '../config/Config';
import { UserDetails, UserWithRoles } from "../models/userModel";

interface UserState {
  isAuthenticated: boolean;
  loading: boolean,
  status: string,
  message: string,
  token: string,
  userWithRoles: UserWithRoles | null
  userRoleStatus: string
}
  
const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  status: "",
  message: "",
  token: localStorage.getItem("user") || "",
  userWithRoles: {
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
    userRoles: [],
    teacherProfile: {
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
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        state: "",
        localGovtArea: "",
        createdAt: ""
      },
      previousSchoolsIds: [],
      createdDate: "",
      updatedDate: "",
      publishedWork: "",
      currentSubjectId: "",
      currentSubject: {
        subjectName: ""
      },
      OtherSubjects: [],
      profilePicture: ""
    },
    nonTeacherProfile: {
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
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        state: "",
        localGovtArea: "",
        createdAt: ""
      },
      previousSchoolsIds: [],
      createdDate: "",
      updatedDate: "",
      profilePicture: ""
    },
    parentProfile: {
      parentId: "",
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
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        state: "",
        localGovtArea: "",
        createdAt: ""
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
      occupation: ""
    },
    studentProfile: {
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
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        state: "",
        localGovtArea: "",
        createdAt: ""
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
        parentId: "",
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
          organizationUniqueId: "",
          schoolUniqueId: "",
          zoneId: "",
          name: "",
          address: "",
          state: "",
          localGovtArea: "",
          createdAt: ""
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
        occupation: ""
      },
      profilePicture: ""
    },
    adminTeacher: {
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
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        state: "",
        localGovtArea: "",
        createdAt: ""
      },
      previousSchoolsIds: [],
      createdDate: "",
      updatedDate: "",
      publishedWork: "",
      currentSubjectId: "",
      currentSubject: {
        subjectName: ""
      },
      OtherSubjects: [],
      profilePicture: ""
    },
    adminNonTeacher: {
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
        organizationUniqueId: "",
        schoolUniqueId: "",
        zoneId: "",
        name: "",
        address: "",
        state: "",
        localGovtArea: "",
        createdAt: ""
      },
      previousSchoolsIds: [],
      createdDate: "",
      updatedDate: "",
      profilePicture: ""
    },
  },
  userRoleStatus: ""
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: object, thunkApi) => {
    try {
      const request = await axios.post<string>(`${baseUrl}/api/auth/login`, data)
      const response = request.data;
      localStorage.setItem("user", request.data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async(_, thunkApi) => {
    try {
      localStorage.removeItem("user")
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const getRefreshToken = createAsyncThunk(
  'user/getRefreshToken',
  async (data: string, thunkApi) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users/refresh-token`, {}, getAxiosConfig());
      console.log("new token = ", response.data)
      localStorage.setItem("user", response.data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const getUserDetails = createAsyncThunk(
	'user/getUserDetails',
	async (userData: UserDetails, thunkApi) => {
		try {
      const { uniqueId, roleName } = userData;
      const response = await axios.get(`${baseUrl}/api/admin/get-user-by-unique-id/${uniqueId}`, {
        params: { roleName },
        ...getAxiosConfig()
      });
      return response.data;
    }  catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      initializeStateFromLocalStorage: (state, action: PayloadAction<string>) => {
        if (action.payload) {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          state.status = "success";
          state.message = "You are already logged in"
        }
      },
      clearAuthState: (state) => {
        return { ...initialState }
      },
      clearUserWithRoles: (state) => {
        state.userRoleStatus = ""
        state.userWithRoles = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          return { ...state, loading: true, status: "pending", message: "Please wait ..." };
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
          if (action.payload) {
            const data = action.payload;
            return {
              ...state,
              isAuthenticated: true,
              token: data,
              status: "success",
              loading: false,
            }
          }
        })
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
          const data = action.payload;
          return {
            ...state, message: data.message, status: "rejected", loading: false
          }
        });
      builder
        .addCase(getRefreshToken.fulfilled, (state, action: PayloadAction<any>) => {
          if (action.payload) {
            const data = action.payload;
            
            return {
              ...state,
              isAuthenticated: true,
              token: data,
              loading: false,
            }
          }
        })

      builder
        .addCase(logoutUser.pending, (state) => {
          return {
            ...state, loading: true
          };
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isAuthenticated = false;
          state.loading = false;
          state.status = "";
          state.message = "";
          state.status = "";
          state.token = "";
        })

      builder
        .addCase(getUserDetails.pending, (state) => {
          state.userRoleStatus = "pending";
          state.userWithRoles = null
        })
        .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
          if (action.payload.data !== null) {
            const userData = action.payload;
            state.userRoleStatus = "success";
            state.userWithRoles = userData.data;
          }
        })
        .addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
          if (action.payload.status === "notFound") {
            //const userData = action.payload.data;
            state.userRoleStatus = "rejected";
            state.userWithRoles = null;
          }
        })
    }
})

export const { initializeStateFromLocalStorage, clearAuthState, clearUserWithRoles } = userSlice.actions;
export default userSlice.reducer;