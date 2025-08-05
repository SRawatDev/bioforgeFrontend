import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Welcome {
    _id:         string;
    username:    string;
    email:       string;
    profile_img: string;
    bio:         string;
    banner_img:  string;
    theme?:       Theme;
    social?:      Social[];
    non_social?:  Social[];
}

export interface Social {
    _id:       string;
    linkTitle: string;
    linkUrl:   string;
    linkLogo:  string;
    type?:      string;
    is_index?:  number;
    status?:    string;
}

export interface Theme {
    fontFamily?:    string;
    is_colorImage?: string;
    fontColor?:     string;
    themeDesign?:     string;
}


interface UserState {
  data: Welcome | {};
}

const initialState: UserState = {
  data: {},
};

const Slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Welcome>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = {};
    },
  },
});

export const { addData ,clearData} = Slice.actions;
export default Slice.reducer;
