import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  mode: 'dark',
  userId: "6663307a025de9d17a8b3f3f",
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