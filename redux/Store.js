import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import { configureStore } from "@reduxjs/toolkit";
import state from "./state";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Data"],
  // blacklist: ['temp']
};
const persistedReducer = persistReducer(persistConfig, state);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
