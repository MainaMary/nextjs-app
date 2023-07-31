import { BtnProps } from "../model/types"

const Button = (props:BtnProps) => {
const {name, onClick, type, children, disabled, className=''} = props
  return (
    <button name={name}  disabled={disabled} className={`flex h-auto items-center focus:outline-none cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${className}`} onClick={onClick} type={type}>{children}</button>
  )
}

export default Button