// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // ✅ Add this
export default store;
