import {useState,useEffect} from "react";
import NavBar from "./Common/NavBar";
import Loading from "./Common/Loading";
import { Tooltip } from '@chakra-ui/react';
import {useSelector} from "react-redux";
export default function Stories(){


    const {user} = useSelector(state => state.auth);
    const [storyId, setStoryId] = useState(window.location.href.split('/').slice(-1)[0]);
    const [story,setStory] = useState(null);
    const [author,setAuthor] = useState(null);
    const [liked,setliked] = useState(null);
    const [storyLikesNum,setStoryLikesNum] = useState(null);

    const getStory = async () =>{
        const response = await fetch('/story/'+storyId);
        const data = await response.json();
        await setStory(data);
    }
    const getAuthor = async ()=>{
        const response = await fetch('/account/'+story.userId);
        const data = await response.json();
        setAuthor(data);
    }
    const getuserLikes = async () => {
        const response = await fetch('/like/byuserid/'+user?.id);
        const data = await response.json();
        setliked(data?.filter(itemLike => itemLike.storyId === storyId ).length !== 0);
    }
    const getstoryLikes = async () => {
        const response = await fetch('/like/bystoryid/'+storyId);
        const data = await response.json();
        setStoryLikesNum(data?.filter(itemLike => itemLike.storyId === storyId ).length);
    }

    const toggleLike = async () =>{
        if(liked){
            await fetch('/like/deletelike', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId:user.id,storyId:story.storyId})
            });
            setliked(false);
            setStoryLikesNum(storyLikesNum-1);
        }else{
            await fetch('/like/addlike', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId:user.id,storyId:story.storyId})
            });
            setliked(true);
            setStoryLikesNum(storyLikesNum+1);
        }
    }


    useEffect(()=>{
        if(user && user !== "no user" ) {
            getuserLikes();
            getstoryLikes();
        }
    },[user])
    useEffect(()=>{
        if(story) getAuthor();
    },[story])
    useEffect( () => {
        getStory();
    },[storyId])

    const getDateAgo =()=>{

        var creation = new Date(story?.creationTime);
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
    const getDate = () =>{
        var creation = new Date(story?.creationTime);
        return creation.toLocaleDateString("tr-TR",{ weekday:"long", year:"numeric", month:"short", day:"numeric"})
    }

    if(!story || !author){return <Loading/>}
    else{
        return(
            <>
                <NavBar page={"stories"}/>
                <div  className="w-full flex items-center justify-center mt-24 mb-12">
                    <div className="w55 bg-story rounded-md shadow2 px-4 pb-24 ">
                        <div className="flex items-center justify-between pt-4 mb-4 border-b-2 border-gray-300 pb-4">
                            <div className="w-4/5 flex flex-col space-y-0">
                                <span className="w-full text-3xl  fontSource">{story.title}</span>
                                <span className="w-full fontSize11 text-gray-400 fontSignika cursor-context-menu">
                                    <Tooltip label={getDate()} aria-label='A tooltip' className="bg-gray-300 px-2 rounded text-sm fontSignika ">
                                        {getDateAgo()}
                                    </Tooltip>
                                </span>
                            </div>
                            <div className="w-1/5 fontSource flex items-center justify-end mr-4 ">
                                <div className=" flex flex-col items-center justify-center">
                                    <Tooltip label={author?.email} aria-label='A tooltip' className="bg-gray-300 px-2 rounded text-sm fontSignika">
                                        <div className="flex flex-col items-center justify-center pr-4 pl-2 py-1 rounded-xl hover:bg-gray-300 cursor-pointer">
                                            <span className="font-bold text-xl text-gray-700 pl-2">@{author?.userName} </span>
                                            <span className="font-bold fontSize11 text-gray-400">Yazar</span>
                                        </div>
                                    </Tooltip>
                                </div>
                                { user !== "no user" ? <div  onClick={toggleLike} className="cursor-pointer text-second z-20 ml-4 flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={liked ? " w-6 h-6 fill-second" :"w-6 h-6"}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <span className="text-sm disableSelect fontSignika text-second">{storyLikesNum}</span>
                                </div> : ""
                                }
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: story.content}}></div>
                    </div>
                </div>
            </>
        )
    }
}