import {useEffect} from "react";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import Loading from "./Loading";
import OptionsMenu from "./optionsMenu";

export default function StoryBox({story,isLiked=false,userId,page}){


    const [author,setAuthor] = useState(null);
    const [liked,setLiked] = useState(isLiked);
    const [storyLikesNum,setStoryLikesNum] = useState(null);


    const toggleLike = async () =>{
        if(liked){
             await fetch('/like/deletelike', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId:userId,storyId:story.storyId})
            });
            setLiked(false);
            setStoryLikesNum(storyLikesNum-1);
        }else{
            await fetch('/like/addlike', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId:userId,storyId:story.storyId})
            });
            setLiked(true);
            setStoryLikesNum(storyLikesNum+1);
        }
    }

    const getAuthor = async ()=>{
        const response = await fetch('/account/'+story.userId);
        const data = await response.json();
        setAuthor(data);
    }
    const getstoryLikes = async () => {
        const response = await fetch('/like/bystoryid/'+story.storyId);
        const data = await response.json();
        setStoryLikesNum(data?.filter(itemLike => itemLike.storyId === story.storyId ).length);
    }


    useEffect(()=>{
        if(userId) {
            getstoryLikes();
        }
    },[userId])
    useEffect(()=>{
        getAuthor();
    },[story])


    const getIntroString = () =>{
        var div = document.createElement("div");
        div.innerHTML = story.content;
        return div.textContent.slice(0,400)
    }
    const getIntoImg = () =>{
        var div = document.createElement('div');
        div.innerHTML = story.content;
        var firstImage = div.getElementsByTagName('img')[0]
        var rawImgSrc = firstImage ? firstImage.getAttribute("src") : "";
        return rawImgSrc;
    }
    const getDateAgo =()=>{
        var creation = new Date(story?.lastModifiedTime);
        var now = new Date();

        const diffMins= Math.ceil(Math.abs(now - creation) /(1000*60) );
        const diffHours = Math.floor(diffMins / 60);;
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = Math.floor(diffDays / 30)
        const diffYears = Math.floor(diffMonths/ 12);

        if(diffYears > 0) return diffYears +" yıl önce";
        if(diffMonths > 0) return diffMonths +" ay önce";
        if(diffDays > 0) return diffDays +" gün önce";
        if(diffHours > 0) return diffHours +" saat önce ";
        if(diffMins > 0) return diffMins +" dakika önce";

    }
    if(!story){
        return <Loading/>
    }else{
        return(
                <div className="w-full mx-12 my-4 py-4 minh11 rounded-lg bg-gray-300 shadow-2xl hover:brightness-105 duration-200">
                    <div className="w-full pt-2 flex flex-col items-start justify-start">
                        <div className="w-full px-6 flex  items-center justify-between fontSize11 text-gray-400 fontSource " >

                            <NavLink to={"/stories/"+story?.storyId}>
                                <div className="flex items-center justify-start space-x-3">
                                    <NavLink to={"/storiesby/"+author?.id} className="text-sm">{author?.userName}</NavLink>
                                    <span className="h-1 w-0.5 bg-gray-400 rounded-full"></span>
                                    <span className="font-bold">{getDateAgo()}</span>
                                </div>
                            </NavLink>
                            <div className="flex items-center justify-center space-x-3 relative">
                            { page !== "homeUnregistered" ? <div  onClick={toggleLike} className="cursor-pointer text-second z-20 bg-opacity-0 px-2 py-1 rounded-lg bg-black hover:bg-opacity-10 ml-4 flex flex-col items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={liked ? " w-6 h-6 fill-second" :"w-6 h-6"}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <span className="text-sm disableSelect fontSignika text-second">{storyLikesNum}</span>
                            </div> : ""
                            }
                            { page === "mystories" ? <OptionsMenu storyId={story?.storyId}/> : ""
                            }
                            </div>
                        </div>

                        <NavLink to={"/stories/"+story?.storyId}>
                        <span className="w-full pl-6 flex flex-col items-start justify-center fontSignika text-2xl cursor-pointer">{story.title}</span>
                        </NavLink>
                    </div>
                    <NavLink to={"/stories/"+story?.storyId}>
                        <div className="w-full px-6 text-sm fontSource text-gray-500 flex">

                            {
                                getIntoImg().length===0 ?
                                    <div className="w-full">
                                        {getIntroString()}
                                        {getIntroString().length>399 ? <span className="text-black">...</span> : " "}
                                    </div> :
                                    <>
                                        <div className="w-4/5">
                                            {getIntroString()}
                                            {getIntroString().length>399 ? <span className="text-black">...</span> : " "}
                                        </div>
                                        <div className="w-1/5 ml-2">
                                            <img src={getIntoImg()}/>
                                        </div>
                                    </>
                            }
                        </div>
                    </NavLink>
                </div>
        )
    }
}

