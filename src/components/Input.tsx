import { Inputprops } from "@/model/types"
export default function Input(props:Inputprops){
    const {type, name, onChange, placeholder, value, required, multiple}= props
    return (
      <input type={type} name={name} value={value} onChange={onChange} required={required} multiple={multiple} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}/>
    )
}