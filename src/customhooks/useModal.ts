import {useState} from "react"
const useModal = () => {
const [showModal, setShowModal] = useState<boolean>(false)
const handleModal = () =>{
    setShowModal(prev => !prev)
}
    return {showModal, setShowModal, handleModal}
}
export default useModal