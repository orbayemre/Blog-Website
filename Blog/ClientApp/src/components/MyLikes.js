import NavBar from "./Common/NavBar";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import StoryBox from "./Common/storyBox";

export default function MyLikes(){
    const {user} = useSelector(state => state.auth);
    const [likes,setlikes] = useState(null);

    const getuserLikes = async () => {
        const response = await fetch('/like/byuserid/'+user?.id);
        const data = await response.json();
        setlikes(data);
    }

    useEffect(()=>{
        if(user){
            getuserLikes();
        }
    },[user])

    if(likes){
        return(
            <div className="relative w-full flex items-center justify-start ">
                <NavBar page={"mylikes"}/>
                <div className="w-2/5 top-20 absolute flex items-center flex-wrap justify-start ml-80 ">
                    {likes?.map((item,index)=> (
                        <span  key={index} className="w-full">
                            <StoryBox story={item} isLiked={true} userId={user.id}/>
                        </span>
                    ))}
                </div>
            </div>
        )
    }
    else{
        return <NavBar page={"mylikes"}/>
    }
}