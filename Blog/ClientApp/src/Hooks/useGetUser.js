import {useEffect, useState} from "react";

export default function useGetUser (){
    const [userData,setUserData] = useState();

    useEffect(()=>{
        const uId = getCookie("uId");
        if(uId) getUserFetch(uId);
        else {
            //setUserData(null);
            setUserData("no user");
            //Diğer cookie de sil ve tekrardan giriş iste
        }
    },[])
    const getUserFetch  = async (id) =>{
        const response = await fetch(`/account/${id}`);
        const data = await response.json();
        setUserData(data);
    }
    return userData;

}

const getCookie = (cookieName) => {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


const setCookie = (cookieName, cookieValue, exHours) => {
    var d = new Date();
    d.setTime(d.getTime() + (exHours * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export {getCookie,setCookie};