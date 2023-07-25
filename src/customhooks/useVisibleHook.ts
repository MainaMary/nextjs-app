import { useState } from "react";

export default function useVisibleHook(){
    const [visible, setVisible] = useState<boolean>(false);
    const handleVisible =() =>{
      setVisible(prev => !prev)
    }
    return { visible, handleVisible };

}

