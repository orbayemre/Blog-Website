import NavBar from "./Common/NavBar";
import Editor from "./Common/Editor";
import {useSelector} from "react-redux";

export default function NewStory(){

    const {user} = useSelector(state => state.auth);
    return(
        <>
            <NavBar page={"new"}/>
            <div  className="w-full flex items-center justify-center mt-24">
                <Editor editorType={"new"} userId={user.id}/>
            </div>
        </>
    )
}