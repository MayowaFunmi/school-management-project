import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAxiosConfig, baseUrl } from '../config/Config';

interface UserState {
  isAuthenticated: boolean;
  loading: boolean,
  status: string,
  message: string,
  token: string,
}
  
const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  status: "",
  message: "",
  token: localStorage.getItem("user") || "",
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
        // .addCase(getRefreshToken.pending, (state) => {
        //   return { ...state };
        // })
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
        // .addCase(getRefreshToken.rejected, (state, action: PayloadAction<any>) => {
        //   const data = action.payload;
        //   return {
        //     ...state, message: data.message, status: "rejected"
        //   }
        // });

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
    }
})

export const { initializeStateFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;