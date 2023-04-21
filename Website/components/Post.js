export function Post(props) {

    return(
        <div className="mx-2 p-2 border shadow border-red-300 bg-green-200">
            
            <div> {props.post.class}</div>

            <div> {props.post.confidence}</div>
        </div>
    )


}