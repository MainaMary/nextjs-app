import Modal from "./Modal"
import useModal from "@/customhooks/useModal"
import Button from "./Button"
import { useAppSelector } from "@/redux/hooks"
import { useDeletePostMutation } from "@/redux/services/api"
import { toast } from "react-toastify"
import { MProps } from "@/model/types"
export default function ConfirmModal(props:MProps){
const {handleModal} =props

const [deletePost] = useDeletePostMutation();
const {postId} = useAppSelector(state =>state.post)

const handleSubmit = async (e:React.SyntheticEvent) =>{
    e.preventDefault()
    const response: any = await deletePost(postId);
    if (response.data.status) {
      toast.info('Post deleted successfully')
      handleModal()
     }
}

    return  <Modal>
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[30%] shadow-lg rounded-2xl m-auto bg-white px-8 py-3  h-auto"
    >
      
      <p></p>
      <div className="flex justify-between">
        <p>Confirm</p>
        <p className="cursor-pointer" onClick={handleModal}>
          X
        </p>
      </div>
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-between">
        <button type="submit" className="rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 border-solid border-2 border-red-600 text-red-600 flex h-auto items-center cursor-pointer">
        Yes
        </button>
        <Button onClick={handleModal}>No</Button>
      </div>
    </form>
  </Modal>
}