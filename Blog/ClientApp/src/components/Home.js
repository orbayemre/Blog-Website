import {useSelector} from "react-redux";
import NavBar from "./Common/NavBar";
import {useEffect, useState} from "react";
import StoryBox from "./Common/storyBox";

export default function Home(){

    const {user} = useSelector(state => state.auth);
    const [stories,setStories] = useState(null);
    const [likes,setlikes] = useState(null);

    const getStories = async () => {
        const response = await fetch('/story');
        const data = await response.json();
        data.sort(function(a,b){
            return new Date(b.lastModifiedTime) - new Date(a.lastModifiedTime);
        });
        setStories(data);
    }
    const getuserLikes = async () => {
        const response = await fetch('/like/byuserid/'+user?.id);
        const data = await response.json();
        setlikes(data);
    }

    useEffect(()=>{
        if(user && user !== "no user" ) getuserLikes();
    },[user])
    useEffect(()=>{
        getStories();
    },[])

    if(likes){
        return(
            <div className="relative w-full flex items-center justify-start ">
                <NavBar page={"home"}/>
                <div className="w-2/5 top-20 absolute flex items-center flex-wrap justify-start ml-80 ">
                    {stories?.map((item,index)=> {
                        const isLiked = likes?.filter(itemLike => itemLike.storyId === item.storyId ).length !== 0;
                        if(item.userId  === user.id) return ""
                        return <span  key={index} className="w-full">
                        <StoryBox story={item} isLiked={isLiked} userId={user.id} page={"homeRegistered"}/>
                    </span>
                    })}
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="relative w-full flex items-center justify-start ">
            <NavBar page={"home"}/>
            <div className="w-2/5 top-20 absolute flex items-center flex-wrap justify-start ml-80 ">
                {stories?.map((item,index)=>
                    <span  key={index} className="w-full">
                        <StoryBox story={item} isLiked={false} page={"homeUnregistered"}/>
                    </span>
                )}
            </div>
        </div>
    )
    }

}
