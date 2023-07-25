import { useReducer, useState } from "react"
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { ActionTypes } from "@/model/types"
import { formReducer } from "@/reducer/formReducer"
import Label from "./Label"
import Input from "./Input"
import useVisibleHook from "@/customhooks/useVisibleHook"
export default function Signin(){
    const initialState = {
        email: '',
        password:''
    }
      const [state, dispatch]:any = useReducer<any>(formReducer, initialState)
      const [error,setError] = useState<string>('')
      const {visible, handleVisible} = useVisibleHook()
      const handleInputChange= (event:any)=>{
        const {name, value} = event.target
        setError('')
        dispatch({
          type: ActionTypes.textInput,
          payload: { key: [name], value: value },
        })
      }
      const {email, password} = state
    const handleSubmit = (e:React.SyntheticEvent) =>{
        e.preventDefault()

    }
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
           <button>Sign in</button>
          </div>
        </form>
      </div>
    )
}