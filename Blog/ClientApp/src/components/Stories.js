import {useState,useEffect} from "react";
export default function Stories(){

    const [storyId, setStoryId] = useState(window.location.href.split('/').slice(-1)[0]);
    const [story,setStory] = useState(null);

    const getStory = async () =>{
        const response = await fetch('/story/'+storyId);
        const data = await response.json();
        setStory(data);
    }
    console.log(story);
    useEffect( () => {
        getStory();
    },[storyId])

    return(
        <>
        </>
    )
}