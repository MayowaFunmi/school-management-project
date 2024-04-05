import { clearUserData } from "../features/adminSlice";
import { clearOrgSchData } from "../features/organizationSlice";
import { clearParentData } from "../features/parentSlice";
import { clearSchoolData } from "../features/schoolSlice";
import { clearProfileData } from "../features/staffSlice";
import { clearStudentData } from "../features/studentSlice";
import { clearAuthState } from "../features/userSlice";
import { clearZoneData } from "../features/zoneSlice";
import store from "../store/store";

export const clearState = () => {
  const storedToken = localStorage.getItem("user");

  if (storedToken) {
    store.dispatch(clearAuthState())
    store.dispatch(clearSchoolData())
    store.dispatch(clearUserData())
    store.dispatch(clearOrgSchData())
    store.dispatch(clearProfileData())
    store.dispatch(clearZoneData())
    store.dispatch(clearParentData())
    store.dispatch(clearStudentData())
  } // make a function
}