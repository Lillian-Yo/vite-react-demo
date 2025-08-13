
// counterSlice.ts 文件

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ArticleState {
  value: string;
  title: string
}
const initialState: ArticleState = {
  value: '',
  title: ''
};

// 请求电影列表
const getArticleApi = ()=> 
    fetch(
        'http://localhost:3000/articles'
    ).then(res => res.json())
  
// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getArticleData = createAsyncThunk( 'article/getArticle', 
  async () => {
    const res = await getArticleApi();
    return res.articles;
  }
);
// 创建一个 Slice 
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getArticleData.fulfilled, (state, action) => {
      state.value = action.payload[0].value;
      state.title = action.payload[0].title;
    });
  },
  reducers: {

  },
});


// 默认导出
export const aritcleReducers = articleSlice.reducer;

