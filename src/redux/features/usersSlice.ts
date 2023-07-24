import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CounterState = {
    value: number;
  };
  
  const initialState = {
    value: 0,
  } 
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      }
    },
  });
  
  export const {incrementByAmount} = userSlice.actions;
  export default userSlice.reducer;