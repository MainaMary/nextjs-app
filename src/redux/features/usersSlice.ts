import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthTypes {
    id: string;
    email:string;
    password: string;
    __v: number;
}
export interface AuthState {
    user: AuthTypes,
    token: string | null

}
const initialState = {
    user: {id:'', email:'', password:'', __v: 0},
    token: null

}
export const AuthSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            setCredentials :(state:AuthState,action:PayloadAction<any>) =>{
                const {name, token} = action.payload
                state.user = name
                state.token = token
                
    
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