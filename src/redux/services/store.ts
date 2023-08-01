import {configureStore} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "@/redux/features/usersSlice";
import { counterReducer } from "../features/paginationSlice";
import { postReducer } from "../features/postSlice";
import { userApi } from "./postApi";
import { api } from "./api";
export const store = configureStore({
    reducer:{
      auth:authReducer,
      counter: counterReducer,
      post: postReducer,
      [userApi.reducerPath]: userApi.reducer,
      [api.reducerPath] :api.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({}).concat([userApi.middleware, api.middleware]),
})

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;