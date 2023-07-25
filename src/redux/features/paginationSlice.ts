import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "@/model/types";
const initialState = {
  value: 0,
} as CounterState;

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
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