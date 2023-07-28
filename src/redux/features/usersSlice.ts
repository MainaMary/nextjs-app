import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/model/types";
export const userDetailsKey ="userDetailsKey"
interface currentUserType{
    message:string, token:string
}
export interface AuthState {
    user: User,
    signedUser: currentUserType
   

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
    // user: localStorage.getItem(userDetailsKey) ? JSON.parse(localStorage.getItem(userDetailsKey) || '')
    // : initialUserState
    user:initialUserState,
    signedUser:{
        message:"",
        token:""
    }
   
}

export const AuthSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            setCredentials :(state:AuthState,action:PayloadAction<User>) =>{
                
                state.user = action.payload
               
                
    
            },
            setCurrentUser:(state:AuthState,action:PayloadAction<currentUserType>)=>{
             state.signedUser = action.payload
             localStorage.setItem(userDetailsKey, JSON.stringify(state.signedUser.token))
            },
            logOut : (state, action) =>{
                state.user= state.user
            }
        }
    })
    export const {
        setCredentials,
        logOut,
        setCurrentUser
    } =  AuthSlice.actions;
    const authReducer = AuthSlice.reducer
    export { authReducer }