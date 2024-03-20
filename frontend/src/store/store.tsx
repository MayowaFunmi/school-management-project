import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice';
import adminReducer from "../features/adminSlice";
import staffReducer from "../features/staffSlice";

const store = configureStore({
    reducer: {
      //auth: authReducer,
      user: userReducer,
      admin: adminReducer,
      staff: staffReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;