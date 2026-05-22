import authReducer from "./slices/authSlice.js";
import entryReducer from "./slices/entrySlice.js";
import adminReducer from './slices/adminSlice.js';
import visitReducer from "./slices/visitSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: "crmsyste",
  storage,
  whitelist: ["auth", "entries"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  entries: entryReducer,
  admin: adminReducer,
  visit: visitReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
