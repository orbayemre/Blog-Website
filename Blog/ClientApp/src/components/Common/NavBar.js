import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import LottieAnimation from "./LottieAnimation";
import ProfileMenu from "./profileMenu";
import useGetUser from "../../Hooks/useGetUser";
import {useEffect, useState} from "react";
import {setUser} from "../../Stores/auth";
import Loading from "./Loading";

export default function NavBar({page}){
    const userData = useGetUser();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(userData === "no user"){
            setLoading(false);
            dispatch(setUser(userData));
            if(page !== "home") window.location.replace("https://localhost:44418/auth");
        }
        else if (userData){
            dispatch(setUser(userData));
            setLoading(false);
        }
        else{
            setLoading(true);
        }
    },[userData]);
    if(loading) return <Loading/>
    return(
        <div className="fixed top-0 w-full h-16 bg-second flex items-center justify-start px-6 fontSignika shadow z-10">
            <NavLink to={"/"} className="w-1/4 flex items-center justify-start">
                <LottieAnimation link={"https://assets4.lottiefiles.com/private_files/lf30_dezgszkb.json"} width={"70px"} height={"70px"}/>
                <div  className="flex flex-col text-2xl fontSource text-first items-center justify-end mr-12 ml-4 space-y-0 leading-none">
                    <span>BLOG</span>
                    <span>WEBSITE</span>
                </div>
            </NavLink>
            { (user === "no user" || !user) ? "" :
                <div className="w-1/3 text-lg text-white flex items-center justify-center space-x-12">
                    <NavLink to={"/"} className="navItem cursor-pointer text-sm transition duration-200 hover:text-first flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"/>
                        </svg>
                        <span>Keşfet</span>
                    </NavLink>
                    <NavLink to={"/mystories"} className="navItem cursor-pointer text-sm transition duration-200 hover:text-first flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                        </svg>
                        <span>Yazılarım</span>
                    </NavLink>
                    <NavLink to={"/new"} className="navItem cursor-pointer text-sm transition duration-200 hover:text-first flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                        <span>Yeni yazı</span>
                    </NavLink>
                    <NavLink to={"/mylikes"} className="navItem cursor-pointer text-sm transition duration-200 hover:text-first flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                        </svg>
                        <span>Beğendiklerim</span>
                    </NavLink>
                </div>
            }
            { user === "no user" ?
                <div className="w-1/3 absolute right-6  text-first flex items-center justify-end mr-24 space-x-3 rounded-xl">
                    <NavLink to={"/auth"} className="cursor-pointer hover:text-firstHover transition duration-200">Giriş yap</NavLink>
                    <NavLink to={"/auth?q=register"} className="cursor-pointer bg-first py-1 px-4 text-second rounded-2xl
                     hover:text-second hover:bg-firstHover transition duration-200">Kayıt ol</NavLink>
                </div> :
                !user ? "":<ProfileMenu user={user}/>
            }

        </div>
    )
}
