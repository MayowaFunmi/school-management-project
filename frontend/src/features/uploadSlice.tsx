import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, getAxiosUploadConfig } from "../config/Config";

interface UploadState {
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null
}

const initialState: UploadState = {
  status: "idle",
  error: null
}

export const uploadProfilePicture = createAsyncThunk(
  'upload/uploadProfilePicture',
  async (formData: FormData, thunkApi) => {
    try {
      const response = await axios.post(`${baseUrl}/api/staff/upload-profile-pictures`, formData, getAxiosUploadConfig())
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        return { ...state, status: 'loading', error: null }
      })
      .addCase(uploadProfilePicture.fulfilled, (state) => {
        return { ...state, status: 'success', error: null }
      })
      .addCase(uploadProfilePicture.rejected, (state, action: PayloadAction<any>) => {
        return { ...state, status: 'failed', error: action.payload }
      });
  },
});

export default uploadSlice.reducer;