import { useReducer, useState, useEffect } from "react"
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


import { ActionTypes, User, ResponseProp} from "@/model/types"
import { formReducer } from "@/reducer/formReducer"
import Label from "./Label"
import Input from "./Input"
import useVisibleHook from "@/customhooks/useVisibleHook"
import { useGetAllUsersQuery } from "@/redux/services/postApi"
import { useAppDispatch } from "@/redux/hooks"
import { setCredentials } from "@/redux/features/usersSlice"

import { useLoginUserMutation, useRegisterUserMutation } from "@/redux/services/api"
import { AuthProps } from "@/model/types"
import { setCurrentUser } from "@/redux/features/usersSlice"



export default function Signin({userExist}:AuthProps){
    const initialState = {
        email: '',
        password:''
    }
      const [state, dispatch]:any = useReducer<any>(formReducer, initialState)
      const [error,setError] = useState<string>('')
      const {visible, handleVisible} = useVisibleHook()
      const {data ,isLoading, isFetching} = useGetAllUsersQuery(null)
     
      const router = useRouter()
      const [loginUser,{isLoading:isLoadingUser, isSuccess:isSuccessLogin, data:loginResponse}] = useLoginUserMutation()
      const [registerUser,{isLoading:isRegisteringUser, isSuccess:isSuccessRegister}] = useRegisterUserMutation()
      const handleInputChange= (event:any)=>{
        const {name, value} = event.target
        setError('')
        dispatch({
          type: ActionTypes.siginText,
          payload: { key: [name], value: value },
        })
      }
      const dispatchUser = useAppDispatch()
      const {email, password} = state
     
    const handleSubmit = async (e:React.SyntheticEvent) =>{
        e.preventDefault()
        if(!password || !email){
          setError('Please submit all details')
        } 
        
        const payload ={email, password}
        if(!userExist){
          const response:any = await registerUser(payload)
          console.log(response.data)
          if(response.data){
            toast.info('Registration successful')
            router.push('/');
          }
          if(response?.error){
            setError(response?.error?.data?.message)
        
          }
        }else{
          const response:any = await loginUser(payload)
          if(response.data){
            toast.info('Login successful')
            router.push('/');
          }
          if(response?.error){
            setError(response?.error?.data?.message)
          }
        }
        // if(data && data.length > 0){
        //   const currentLoggedInUser = data?.find(user => user.email === email)
        //   if(currentLoggedInUser){
        //     dispatchUser(setCredentials(currentLoggedInUser))
        //     router.push('/');
        //   }else{
        //     setError('Please submit correct credentials')
        //   }
        // }
    }
    useEffect(()=>{
      if(isSuccessRegister){
      toast.info("User registered successfully");
      }
      if(isSuccessLogin){

      }
    },[isSuccessRegister, isSuccessLogin])
    console.log(loginResponse,'login')
    return (
        <div className='w-full md:w-[50%] shadow-lg rounded-2xl flex m-auto bg-white px-8 py-3 items-center justify-center h-auto mt-12'>
        <form className='w-full' onSubmit={handleSubmit}>
         
          <p className="text-red-500">{error}</p>
          <div className='my-4'>
            <Label>Email</Label>
            <Input placeholder="John Doe" name="email" onChange={handleInputChange} type="text" value={email || ''}/>
          </div>
          <div className="my-4">
            <Label>Password</Label>
            <div className="relative">
            <Input name="password" onChange={handleInputChange} type={visible ? "text" :"password"} value={password || ''}/>
              <div onClick={handleVisible} className="absolute right-2 top-3">
              {visible ? <AiFillEyeInvisible/> : <AiFillEye/>}
              </div>
            
            </div>
            
          </div>
         
          <div className="my-4">

           <button>{userExist? "Sign in":"SIgn up"}</button>
          </div>
          <div className="my-4">
            {userExist ? <p>Don't have an account yet? <Link href={"/auth/register"}>Sign up</Link></p>:
            <p>Have an account? <Link href={"/auth/signin"}>Sign in</Link></p>
            }
           
          </div>
        </form>
      </div>
    )
}