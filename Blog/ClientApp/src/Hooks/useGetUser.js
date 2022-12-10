import {useEffect, useState} from "react";

export default function useGetUser (){
    const [userData,setUserData] = useState();

    useEffect(()=>{
        getUserFetch();
    },[])
    const getUserFetch  = async () =>{
        const response = await fetch(`/account/currentuser`);
        const data = await response.json();
        setUserData(data);
    }
    return userData;
}
