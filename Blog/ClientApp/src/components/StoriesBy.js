import {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import NavBar from "./Common/NavBar";
import StoryBox from "./Common/storyBox";

export default function StoriesBy(){

    const {user} = useSelector(state => state.auth);
    const [authorId, setAuthorId] = useState(window.location.href.split('/').slice(-1)[0]);
    const [author, setAuthor] = useState(window.location.href.split('/').slice(-1)[0]);
    const [stories,setStories] = useState(null);
    const [likes,setLikes] = useState(null);
    const getStories = async ()=>{

        const response = await fetch('/story/userAllStories/'+authorId);
        const data = await response.json();
        setStories(data);
    }
    const getAuthor = async ()=>{

        const response = await fetch('/account/'+authorId);
        const data = await response.json();
        setAuthor(data);
    }

    const getuserLikes = async () => {
        const response = await fetch('/like/byuserid/'+user?.id);
        const data = await response.json();
        setLikes(data);
    }

    useEffect( () => {
        if(authorId){
            getStories();
            getuserLikes();
            getAuthor();
        }
    },[authorId])

    if(likes){
        return(
            <div className="relative w-full flex items-center justify-start ">
                <NavBar page={"storiesby"}/>
                <div className="w-full top-20 absolute  flex items-center justify-center">
                     <div className="w-2/5 mr-44 border-b-4 pb-4 border-first rounded-md ">
                         <span className="text-4xl fontSignika text-first">
                             {author.userName}'den yazılar
                         </span>
                     </div>
                </div>
                <div className="w-2/5 top-36 absolute flex items-center flex-wrap justify-start ml-80 ">
                    {stories?.map((item,index)=> {
                        const isLiked = likes?.filter(itemLike => itemLike.storyId === item.storyId ).length !== 0;
                        return <span  key={index} className="w-full">
                        <StoryBox story={item} isLiked={isLiked} userId={user.id} page={"storiesby"}/>
                    </span>
                    })}
                </div>
            </div>
        )
    }
    else{
        return <NavBar page={"mystoriesby"}/>
    }

}