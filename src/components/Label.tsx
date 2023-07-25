import { LabelProps } from "@/model/types"
export default function Label({children}:LabelProps){
    return (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{children}</label>
      )
}