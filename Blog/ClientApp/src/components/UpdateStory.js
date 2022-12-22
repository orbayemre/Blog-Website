import NavBar from "./Common/NavBar";
import Editor from "./Common/Editor";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";

export default function UpdateStory(){

    const [storyId, setStoryId] = useState(window.location.href.split('/').slice(-1)[0]);
    const [updateStory,setUpdateStory] = useState(null);

    const {user} = useSelector(state => state.auth);
    console.log(user?.id,updateStory);
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
            console.log("eşit");
            //sayfayı yükle
        }
        else{
            //yetkisiz url bir önceki url yolla ya da home a
            console.log("eşit değil");
        }
    }else{
        //loading
    }


    return(
        <>
            <NavBar/>
            <div  className="mt-32 mx-12">
                <Editor editorType={"update"} data={{title:"tt",content:"con"}}/>
            </div>
        </>
    )
}