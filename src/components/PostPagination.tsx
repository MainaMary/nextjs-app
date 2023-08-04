interface Props {
    pageSize:number;
    totalItems:number;
    totalPages: number
}
export default function PostPagination({pageSize, totalItems, totalPages}:Props){
    console.log(new Array(totalPages))
    return(<>
    <p>Hello world</p>
        <ul className="flex gap-4">{new Array(totalPages)?.map(page =><li>{page}</li>)}</ul>
    </>
        
    )
}