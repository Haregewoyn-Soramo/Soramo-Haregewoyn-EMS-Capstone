import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  mode: 'dark',
  userId: "665c6d724db0e0d31a781d14",
};
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers:{
    setMode: (state) =>{
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  }
 
})

export const {setMode} = globalSlice.actions;

export default globalSlice.reducer;