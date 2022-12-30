import NavBar from "./Common/NavBar";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import StoryBox from "./Common/storyBox";

export default function MyStories(){

    const {user} = useSelector(state => state.auth);
    const [stories,setStories] = useState(null);
    const [likes,setLikes] = useState(null);

    const getStories = async () => {
        const response = await fetch('/story/userAllStories/'+user?.id);
        const data = await response.json();
        setStories(data);
    }
    const getuserLikes = async () => {
        const response = await fetch('/like/byuserid/'+user?.id);
        const data = await response.json();
        setLikes(data);
    }

    useEffect(()=>{
        if(user){
            getStories();
            getuserLikes();
        }
    },[user])

    if(likes){
        return(
            <div className="relative w-full flex items-center justify-start ">
                <NavBar page={"mystories"}/>
                <div className="w-2/5 top-20 absolute flex items-center flex-wrap justify-start ml-80 ">
                    {stories?.map((item,index)=> {
                        const isLiked = likes?.filter(itemLike => itemLike.storyId === item.storyId ).length !== 0;
                        return <span  key={index} className="w-full">
                        <StoryBox story={item} isLiked={isLiked} userId={user.id} page={"mystories"}/>
                    </span>
                    })}
                </div>
            </div>
        )
    }
    else{
        return <NavBar page={"mystories"}/>
    }
}