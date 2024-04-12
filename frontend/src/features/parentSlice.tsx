import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ParentInput, ParentState } from "../models/parentModels";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: ParentState = {
  parentMsg: "",
  msg: "",
  getParent: {
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
    profilePicture: "",
    address: "",
    religion: "",
    maritalStatus: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    lgaOfResidence: "",
    occupation: "",
    gender: "",
    relationshipType: "",
    dateOfBirth: "",
    age: 0,
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
    parentId: ""
  },
  getMessage: "",
  getMsg: "",
  schParents: [],
  schParentMsg: ""
}

export const createParentProfile = createAsyncThunk(
	'parent/createParentProfile',
	async (data: ParentInput, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/parent/create-parent-profile`, data, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getParentProfile = createAsyncThunk(
  'parent/getParentProfile',
  async (parentId: string, thunkApi) => {
    try {
      const endpoint = `${baseUrl}/api/parent/get-parent-profile/${parentId}`
      const response = await axios.get(endpoint, getAxiosConfig())
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const getSchoolParents = createAsyncThunk(
  'parent/getSchoolParents',
  async (schoolId: string, thunkApi) => {
    try {
      const endpoint = `${baseUrl}/api/school/get-school-parents/${schoolId}`
      const response = await axios.get(endpoint)
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    clearParentData: (state) => {
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
			.addCase(createParentProfile.pending, (state) => {
				return { ...state, parentMsg: "pending" }
			})
			.addCase(createParentProfile.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const profile = action.payload;
					return {
						...state, parentMsg: "success", msg: profile.message
					}
				}
			})
			.addCase(createParentProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, parentMsg: "rejected", msg: profile.message
					}
				}
			})

    builder
			.addCase(getParentProfile.pending, (state) => {
				return { ...state, getMessage: "pending", getMsg: "Fetching staff profile data", }
			})
			.addCase(getParentProfile.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const profile = action.payload;
					return {
						...state, getParent: profile.data, getMessage: "success", getMsg: profile.message
					}
				}
			})
			.addCase(getParentProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, getParent: profile.data, getMessage: "rejected", getMsg: profile.message
					}
				}
			})

    builder
			.addCase(getSchoolParents.pending, (state) => {
				return { ...state, schParentMsg: "pending" }
			})
			.addCase(getSchoolParents.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload !== null) {
					const parents = action.payload;
					return {
						...state, schParents: parents.data, schParentMsg: "success"					}
				}
			})
			.addCase(getSchoolParents.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const parents = action.payload;
					return {
						...state, schParents: parents.data, schParentMsg: "rejected"
					}
				}
			})
  }
})

export const { clearParentData } = parentSlice.actions;
export default parentSlice.reducer;