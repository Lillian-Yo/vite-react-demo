//slices/globalSlce.ts
import { createSlice } from "@reduxjs/toolkit";
import {increment} from '../slices/counterSlice';
interface GlobalData {
  loading: boolean;
  userInfo: object;
}

const initialState = {
  loading: false, //控制全局loading
  userInfo: {}, //存储用户登录信息
  count: 0,
};

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setGlobalLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload.userInfo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(increment, (state, action) => {
      state.count = action.payload.value;
    });
  },
});
//actions
export const { setGlobalLoading } = globalDataSlice.actions;
//reducers
export const globalReducers = globalDataSlice.reducer;
