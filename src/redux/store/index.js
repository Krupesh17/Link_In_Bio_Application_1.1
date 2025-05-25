import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import dashboardSlice from "../features/dashboardSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    dashboard: dashboardSlice,
  },
});

export default store;
