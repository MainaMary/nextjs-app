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
const initialState = {
  // user: {id:'', email:'', password:'', __v: 0},
  user: localStorage.getItem(USER)
  ? JSON.parse(localStorage.getItem(USER) || '{}')
  : null,
  token: null
}



export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setCredentials :(state:AuthState,action:PayloadAction<any>) =>{
          const {name, token} = action.payload
          state.user = action.payload
          localStorage.setItem(USER, JSON.stringify(action.payload))
          

      },
      setUserDeatils:() =>{

      },
      logOut : (state, action) =>{
          state.user= {id:'', email:'', password:'', __v: 0}
      }
  }
})
export const {
  setCredentials
} =  AuthSlice.actions;
const authReducer = AuthSlice.reducer
export { authReducer }
