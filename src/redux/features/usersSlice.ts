import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/model/types";

export interface AuthTypes {
  id: string;
  email:string;
  password: string;
  __v: number;
}
export interface AuthState {
  user: AuthTypes,
  token: string | null,

}
export const USER ='user'
export const TOKEN ='token'
const initialState = {
  // user: {id:'', email:'', password:'', __v: 0},
  user: localStorage.getItem(USER)
  ? JSON.parse(localStorage.getItem(USER) || '{}')
  : null,
  token: localStorage.getItem(TOKEN)
  ? JSON.parse(localStorage.getItem(TOKEN) || '{}')
  : null,
}



export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setCredentials :(state:AuthState,action:PayloadAction<AuthTypes>) =>{
          state.user = action.payload
          localStorage.setItem(USER, JSON.stringify(action.payload))
      },
      setUserToken:(state:AuthState, action:PayloadAction<string>) =>{
        state.token = action.payload
        localStorage.setItem(TOKEN, JSON.stringify(action.payload))
        },
      logOut : (state) =>{
          state.user= {id:'', email:'', password:'', __v: 0}
      }
  }
})
export const {
  setCredentials,
  setUserToken
} =  AuthSlice.actions;
const authReducer = AuthSlice.reducer
export { authReducer }
