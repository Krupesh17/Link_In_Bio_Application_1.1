import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

import userSlice from "../features/userSlice";
import dashboardSlice from "../features/dashboardSlice";

const rootReducer = combineReducers({
  user: userSlice,
  dashboard: dashboardSlice,
});

const userFilter = createFilter("user", ["user", "profile"]);
const dashboardFilter = createFilter("dashboard", [
  "socialChannels",
  "appearance",
  "links",
  "clicks",
]);

const persistConfig = {
  key: "root",
  storage,
  transforms: [userFilter, dashboardFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
