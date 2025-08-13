//store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { counterReducers } from "./slices/counterSlice";
import { globalReducers } from "./slices/globalSlice";
import { aritcleReducers } from "../containers/article/articleSlice";

//redux写法------start---------
// import { createStore } from "redux";
// import { counterReducer } from "./Reducer/index";
//createStore 创建一个redux数据(旧，测试用的，使用时忽略)
// const store = createStore(counterReducer);
//redux写法------end---------

// configureStore创建一个redux数据（新）;
const store = configureStore({
  //合并多个slice
  reducer: {
    counter: counterReducers,
    globalData: globalReducers,
    article: aritcleReducers,
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

