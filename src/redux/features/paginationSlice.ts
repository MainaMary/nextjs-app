import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "@/model/types";
const initialState = {
  pageNumber: 1,
} as CounterState;

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.pageNumber+= 1;
    },
    decrement: (state) => {
      state.pageNumber -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.pageNumber += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.pageNumber -= action.payload;
    },
  },
});

export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
} = CounterSlice.actions;
const counterReducer = CounterSlice.reducer
export {counterReducer};