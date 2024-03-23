import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IZone } from "../models/userModel";
import { baseUrl, getAxiosConfig } from "../config/Config";
import axios from "axios";

const initialState: IZone = {
  allZones: [],
  allZoneMsg: ""
}

export const getOrganizationZonesByUniqueId = createAsyncThunk(
	'zone/getOrganizationZonesByUniqueId',
	async (organizationUniqueId: string, thunkApi) => {
		try {
			const endpoint = `${baseUrl}/api/admin/show-all-organization-zones/${organizationUniqueId}`;
			const response = await axios.get(endpoint, getAxiosConfig());
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    clearZoneData: (state) => {
			return { ...initialState };
		},
  },
  extraReducers: (builder) => {
    builder
			.addCase(getOrganizationZonesByUniqueId.pending, (state) => {
				return { ...state, allZoneMsg: "pending" }
			})
			.addCase(getOrganizationZonesByUniqueId.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const zoneData = action.payload;
					return {
						...state, allZones: zoneData.data, allZoneMsg: "success"
					}
				}
			})
			.addCase(getOrganizationZonesByUniqueId.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const zoneData = action.payload;
					return {
						...state, allZones: zoneData.data, allZoneMsg: "rejected"
					}
				}
			})
  }
})

export const { clearZoneData } = zoneSlice.actions;
export default zoneSlice.reducer;