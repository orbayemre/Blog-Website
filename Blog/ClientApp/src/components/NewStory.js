import NavBar from "./Common/NavBar";
import Editor from "./Common/Editor";
import {useSelector} from "react-redux";

export default function NewStory(){

    const {user} = useSelector(state => state.auth);
    return(
        <>
            <NavBar/>
            <div  className="mt-32 mx-12">
                <Editor editorType={"new"} userId={user.id}/>
            </div>
        </>
    )
}