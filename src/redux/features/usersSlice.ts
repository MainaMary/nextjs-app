import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/model/types";
export const userDetailsKey ="userDetailsKey"
export interface AuthState {
    user: User,
   

}
export const initialUserState =  {
    id: '',
    name: '',
    username: '',
    email:'',
    address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
            lat: '',
            lng: ''
        }
    },
    phone: '',
    website: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: ''
    }

}
const initialState = {
    user: localStorage.getItem(userDetailsKey)
    ? JSON.parse(localStorage.getItem(userDetailsKey) || '')
    : initialUserState
   
}

export const AuthSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            setCredentials :(state:AuthState,action:PayloadAction<any>) =>{
                
                state.user = action.payload
               
                localStorage.setItem(userDetailsKey, JSON.stringify(state.user))
    
            },
            logOut : (state, action) =>{
                state.user= state.user
            }
        }
    })
    export const {
        setCredentials,
        logOut
    } =  AuthSlice.actions;
    const authReducer = AuthSlice.reducer
    export { authReducer }