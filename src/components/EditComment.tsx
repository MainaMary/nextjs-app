import Modal from "./Modal"
import CommentForm from "./CommentForm"
export default function EditComment(){
    return <Modal>
        <div className="w-full md:w-[30%] shadow-lg rounded-2xl m-auto bg-white px-8 py-3  h-auto">
        <CommentForm/>
        </div>
     
    </Modal>
}