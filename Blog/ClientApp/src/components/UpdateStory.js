import NavBar from "./Common/NavBar";
import Editor from "./Common/Editor";

export default function UpdateStory(){

    return(
        <>
            <NavBar/>
            <div  className="mt-32 mx-12">
                <Editor editorType={"update"} data={{title:"tt",content:"con"}}/>
            </div>
        </>
    )
}