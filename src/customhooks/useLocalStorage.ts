import {useEffect, useState} from "react"
const useLocalStorage = () =>{
    const [currentUser, setCurrentUser] = useState(
        {
     
            id: '',
            email:'',
            password: '',
            __v: 0,
        }
    )
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setCurrentUser(parsedUser ?? {
          _id: '',
          email: '',
          password: '',
          __v: 0,
        });
      }, [])
      return {currentUser, setCurrentUser}
}
export default useLocalStorage;