import NavBar from "./Common/NavBar";
import Editor from "./Common/Editor";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
export default function UpdateStory(){

    const [storyId, setStoryId] = useState(window.location.href.split('/').slice(-1)[0]);
    const [updateStory,setUpdateStory] = useState(null);

    const {user} = useSelector(state => state.auth);

    const getUpdateStory = async () =>{
        const response = await fetch('/story/'+storyId);
        const data = await response.json();
        setUpdateStory(data);
    }

    useEffect( () => {
        getUpdateStory();
    },[storyId])
    if(user?.id && updateStory?.userId){
        if(user?.id === updateStory.userId){
            return(
                <>
                    <NavBar page={"update"}/>
                    <div  className="w-full flex items-center justify-center mt-20">
                        <Editor editorType={"update"} storyId={storyId} userId={user.id} data={{title:updateStory.title,content:updateStory.content}}/>
                    </div>
                </>
            )
        }
        else{
            window.history.back();
        }
    }else{
        return(
            <NavBar page={"update"}/>
        )
    }



}