import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice"
const store = configureStore({
  reducer: {
    userInfo: Slice,
  },
});
export default store;