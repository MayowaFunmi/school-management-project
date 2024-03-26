import { clearUserData } from "../features/adminSlice";
import { clearOrgSchData } from "../features/organizationSlice";
import { clearSchoolData } from "../features/schoolSlice";
import { clearProfileData } from "../features/staffSlice";
import { initializeStateFromLocalStorage } from "../features/userSlice";
import { clearZoneData } from "../features/zoneSlice";
import store from "../store/store";

export const clearState = () => {
  const storedToken = localStorage.getItem("user");

  if (storedToken) {
    store.dispatch(initializeStateFromLocalStorage(storedToken));
    store.dispatch(clearSchoolData())
    store.dispatch(clearUserData())
    store.dispatch(clearOrgSchData())
    store.dispatch(clearProfileData())
    store.dispatch(clearZoneData())
  } // make a function
}