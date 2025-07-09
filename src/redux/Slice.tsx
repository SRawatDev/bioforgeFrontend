import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  _id: string,
  username: string;
  email: string;
  profile_img: string;
  bio?: string;
  banner_img: string;
  theme?: {
    fontFamily: string;
    is_colorImage: string;
    fontColor: string;
  };
}

interface UserState {
  data: UserInfo | {};
}

const initialState: UserState = {
  data: {},
};

const Slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<UserInfo>) => {
      state.data = action.payload;
    },
  },
});

export const { addData } = Slice.actions;
export default Slice.reducer;
