import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ParentInput, ParentState } from "../models/parentModels";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";

const initialState: ParentState = {
  parentData: {
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
    schoolId: "",
    school: {
      schoolId: "",
      organizationUniqueId: "",
      schoolUniqueId: "",
      zoneId: "",
      name: "",
      address: "",
      localGovtArea: "",
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
    age: 0
  },
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
    schoolId: "",
    school: {
      schoolId: "",
      organizationUniqueId: "",
      schoolUniqueId: "",
      zoneId: "",
      name: "",
      address: "",
      localGovtArea: "",
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
    age: 0
  },
  getMessage: "",
  getMsg: ""
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
						...state, parentData: profile.data, parentMsg: "success", msg: profile.message
					}
				}
			})
			.addCase(createParentProfile.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const profile = action.payload;
					return {
						...state, parentData: profile.data, parentMsg: "rejected", msg: profile.message
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
  }
})

export const { clearParentData } = parentSlice.actions;
export default parentSlice.reducer;