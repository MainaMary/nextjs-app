import { Title } from "@/model/types"
const Title = ({children}:Title) => {
    return (
      <p className='text-4xl text-[#200E32] text-center font-semibold'>{children}</p>
    )
  }
  
  export default Title