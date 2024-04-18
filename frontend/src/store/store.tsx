import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice';
import adminReducer from "../features/adminSlice";
import staffReducer from "../features/staffSlice";
import zoneReducer from "../features/zoneSlice";
import schoolReducer from "../features/schoolSlice";
import organizationReducer from "../features/organizationSlice";
import subjectReducer from "../features/subjectSlice";
import teacherReducer from "../features/teacherSlice";
import uploadReducer from "../features/uploadSlice";
import parentReducer from "../features/parentSlice";
import studentReducer from "../features/studentSlice";
import studentclassReducer from "../features/studentclassSlice";

const store = configureStore({
    reducer: {
      //auth: authReducer,
      user: userReducer,
      admin: adminReducer,
      staff: staffReducer,
      zone: zoneReducer,
      school: schoolReducer,
      organization: organizationReducer,
      subject: subjectReducer,
      teacher: teacherReducer,
      upload: uploadReducer,
      parent: parentReducer,
      student: studentReducer,
      studentclass: studentclassReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 }, // or false
      serializableCheck: { warnAfter: 128 },  // or false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;