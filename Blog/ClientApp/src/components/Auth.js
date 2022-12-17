import {useEffect, useState} from "react";
import LottieAnimation from "./Common/LottieAnimation";
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch} from "react-redux";
import {setUser} from "../Stores/auth";
import useGetUser from "../Hooks/useGetUser";
import Loading from "./Common/Loading";
import {NavLink, useSearchParams} from "react-router-dom";

export default function Auth(){

    const [shownLogin,setShownLogin] = useState(true);
    const [loading,setLoading] = useState(true);
    const userData = useGetUser();
    const [searchParams,setSearchParams] = useSearchParams();

    useEffect(()=>{
        if(searchParams.get('q') === "register") setShownLogin(false);
    },[])

    useEffect(()=>{
        if(userData === "no user"){
            setLoading(false);
        }
        else if (userData){
            window.location.replace("https://localhost:44418/");
        }
        else{
            setLoading(true);
        }
    },[userData]);

    return(
        <>
        {loading && <Loading/>}
        <NavLink to={"/"}  className="absolute top-0 left-0 w-1/4 flex items-center justify-start">
            <LottieAnimation link={"https://assets4.lottiefiles.com/private_files/lf30_dezgszkb.json"} width={"70px"} height={"70px"}/>
            <div className="flex flex-col text-2xl fontSource text-second items-center justify-end mr-12 ml-4 space-y-0 leading-none">
                <span>BLOG</span>
                <span>WEBSITE</span>
            </div>
        </NavLink>
        <div className="w-screen h-screen bg-first flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-xl shadow1 flex items-center justify-between">
                <div className="w-1/2 h-full rounded-l-xl flex flex-col items-center justify-center fontSignika border-r border-first">
                    { !shownLogin ? (
                            <div className="w-full h-full rounded-l-xl flex flex-col items-center justify-center space-y-3 linearGrad2">
                                <LottieAnimation link={"https://assets4.lottiefiles.com/private_files/lf30_eivlwmgd.json"} height={"200px"} width={"200px"}/>
                                <h1 className="text-xl text-white"> Zaten bir hesabınız var mı? </h1>
                                <span onClick={() => setShownLogin(true)} className="border-t-4 hover:bg-first duration-500 border-first rounded text-white px-5 py-2 cursor-pointer">Giriş Yap</span>
                            </div>
                        ) : <Login setLoad={setLoading}/>
                    }
                </div>
                <div className="w-1/2 h-full rounded-r-xl flex items-center justify-center fontSignika">
                    { shownLogin ? (
                        <div className="w-full h-full rounded-r-xl flex flex-col items-center justify-center space-y-3 linearGrad1 ">
                            <LottieAnimation link={"https://assets7.lottiefiles.com/packages/lf20_9cyyl8i4.json"} height={"200px"} width={"200px"}/>
                            <h1 className="text-xl text-white"> Henüz bir hesabınız yok mu? </h1>
                            <span onClick={() => setShownLogin(false)} className="border-t-4 hover:bg-first duration-500 border-first rounded text-white px-5 py-2 cursor-pointer">Kayıt Ol</span>
                        </div>
                        ) : <SignUp setLoad={setLoading}/>
                    }
                </div>
            </div>
        </div>
        <Toaster
            position="top-center"
            reverseOrder={false}/>
        </>
    )
}

const Login = (setLoad) =>{

    const [usernameOrEmail,setUsernameOrEmail] = useState("");
    const [isEmail,setIsEmail] = useState();
    const [passwordShow,setPasswordShow] = useState();
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleChangeUsernameOrEmail =  (e) =>{
        setUsernameOrEmail(e.target.value);
    }
    const handleChangePassword = (e) =>{
        setPassword(e.target.value);
    }
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        if(usernameOrEmail === "" || password === "" ) {toast.error("Lütfen tüm alanları doldurun.")}
        else if(isEmail) {
            const response = await fetch('/account/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserName:"",Email:usernameOrEmail , Password:password})
            });
            const data = await response.json();
            if(typeof data === "string"){toast.error(data)}
            else{
                await dispatch(setUser(data));
                window.location.replace("https://localhost:44418/");
                setLoad(true);
            }
        }
        else {
            const response = await fetch('/account/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserName:usernameOrEmail ,Email:"", Password:password})
            });
            const data = await response.json();
            if(typeof data === "string"){toast.error(data)}
            else {
                await dispatch(setUser(data));
                window.location.replace("https://localhost:44418/");
                setLoad(true);
            }
        }
    }
    useEffect(()=>{
        if( validateEmail(usernameOrEmail) )  setIsEmail(true);
        else  setIsEmail(false);
    },[usernameOrEmail]);
    return(
        <div className="w-full h-full rounded-l-xl bg-second">
            <form onSubmit={handleSubmitLogin}  className="flex flex-col items-center justify-center space-y-12 p-20 fontSignika">
                <h1 className="text-2xl text-first tracking-wider font-bold ">Giriş Yap</h1>
                <div className="w-3/4 disableSelect flex flex-col items-center justify-center space-y-6">
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                        </svg>
                        <input type="text" id="usernameOrEmail" placeholder="E-mail  ya da kullanıcı adı." value={usernameOrEmail} onChange={handleChangeUsernameOrEmail}
                               className="w-full box-border pt-2  rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white  focus:rounded-b-0 border-first"/>
                    </div>
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        <input type={passwordShow ? 'text' : 'password'} id="password" placeholder="Şifre" value={password} onChange={handleChangePassword} autoComplete="off"
                                className="w-full  pt-2 border-l outline-none pl-3 py-1 duration-200 border-b-4 focus:border-b-first border-b-white focus:rounded-b-0 border-first"/>
                        <div className="w-12 text-first cursor-pointer" onClick={()=>setPasswordShow(!passwordShow)}>
                            {!passwordShow ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            }
                        </div>
                    </div>
                    <input type="submit" value="Giriş Yap" className="py-2 px-6 border border-first text-first font-bold rounded duration-200 cursor-pointer hover:bg-first hover:text-white"/>
                </div>
            </form>
        </div>
    )
}


const SignUp = (setLoad) =>{

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errMess,setErrMess] = useState("");
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmail(e.target.value);
    }
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        if(username === "") setErrMess("Kullanıcı adı gereklidir.");
        else if(email === "") setErrMess("E-mail gereklidir.");
        else if (validateEmail(email) === null) setErrMess("Geçerli bir email adresi giriniz.");
        else if (password === "") setErrMess("Şifre gereklidir.");
        else if(confirmPassword !== password) setErrMess("Şifreler uyuşmuyor.")
        else {
            setErrMess("");
            const response = await fetch('/account/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserName:username ,Email:email ,Password:password ,ConfirmPassword:confirmPassword})
            });
            const data = await response.json();
            if(typeof data === "string"){toast.error(data)}
            else {
                await dispatch(setUser(data));
                window.location.replace("https://localhost:44418/");
                setLoad(true);
            }
        }


    }

    return(
        <div className="w-full h-full rounded-r-xl bg-second">
            <form onSubmit={handleSubmitSignup} className="flex flex-col items-center justify-center space-y-6 p-20 fontSignika">
                <h1 className="text-2xl text-first tracking-wider font-bold ">Kayıt Ol</h1>
                <div className="w-3/4 disableSelect flex flex-col items-center justify-center space-y-6">
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>

                        <input type="text" id="username" placeholder="Kullanıcı adı" value={username} onChange={handleChangeUsername} autoComplete="off"
                                className="w-full rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white  focus:rounded-b-0 border-first"/>
                    </div>
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                        </svg>
                        <input type="text" id="e-mail" placeholder="E-mail" value={email} onChange={handleChangeEmail} autoComplete="off"
                               className="w-full rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white  focus:rounded-b-0 border-first"/>
                    </div>
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        <input type="password" id="password" placeholder="Şifre" value={password}  onChange={(e) => setPassword(e.target.value)}
                               className="w-full rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white  focus:rounded-b-0 border-first"/>
                    </div>
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        <input type="password" id="confirmPassword" placeholder="Şifreyi onaylayın." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                               className="w-full rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white  focus:rounded-b-0 border-first"/>
                    </div>
                    <div className="w-full text-sm text-red-800 flex items-start justify-start space-x-3">{errMess}</div>
                    <input type="submit" value="Kayıt Ol" className="py-2 px-6 border border-first text-first font-bold rounded duration-200 cursor-pointer hover:bg-first hover:text-white"/>
                </div>
            </form>

        </div>
    )
}