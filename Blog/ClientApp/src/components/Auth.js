import {useEffect, useState} from "react";
import LottieAnimation from "./Common/LottieAnimation";
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch} from "react-redux";
import {setUser} from "../Stores/auth";
import useGetUser, {setCookie} from "../Hooks/useGetUser";

export default function Auth(){

    const [shownLogin,setShownLogin] = useState(true);
    const userData = useGetUser();

    useEffect(()=>{
        if(userData === "no user"){
            //loadingi state i false yap
        }
        else if (userData){
            window.location.replace("https://localhost:44418/");
        }
        else{
            //loadingi state i true yap
        }
    },[userData]);

    return(
        <>
        <div className="w-screen h-screen bg-first flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-xl shadow1 flex items-center justify-between">
                <div className="w-1/2 h-full rounded-l-xl flex flex-col items-center justify-center fontSignika border-r border-first">
                    { !shownLogin ? (
                            <div className="w-full h-full rounded-l-xl flex flex-col items-center justify-center space-y-3 linearGrad2">
                                <LottieAnimation link={"https://assets4.lottiefiles.com/private_files/lf30_eivlwmgd.json"} height={"200px"} width={"200px"}/>
                                <h1 className="text-xl text-white"> Zaten bir hesabınız var mı? </h1>
                                <span onClick={() => setShownLogin(true)} className="border-t-4 hover:bg-first duration-500 border-first rounded text-white px-5 py-2 cursor-pointer">Giriş Yap</span>
                            </div>
                        ) : <Login/>
                    }
                </div>
                <div className="w-1/2 h-full rounded-r-xl flex items-center justify-center fontSignika">
                    { shownLogin ? (
                        <div className="w-full h-full rounded-r-xl flex flex-col items-center justify-center space-y-3 linearGrad1 ">
                            <LottieAnimation link={"https://assets7.lottiefiles.com/packages/lf20_9cyyl8i4.json"} height={"200px"} width={"200px"}/>
                            <h1 className="text-xl text-white"> Henüz bir hesabınız yok mu? </h1>
                            <span onClick={() => setShownLogin(false)} className="border-t-4 hover:bg-first duration-500 border-first rounded text-white px-5 py-2 cursor-pointer">Kayıt Ol</span>
                        </div>
                        ) : <SignUp/>
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

const Login = () =>{

    const [usernameOrEmail,setUsernameOrEmail] = useState("");
    const [isEmail,setIsEmail] = useState();
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
                setCookie("uId",data.id,24);
                await dispatch(setUser(data));
                window.location.replace("https://localhost:44418/");
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
                setCookie("uId",data.id,24);
                await dispatch(setUser(data));
                window.location.replace("https://localhost:44418/");
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
                               className="w-full box-border rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white  focus:rounded-b-0 border-first"/>
                    </div>
                    <div className="w-full flex items-center justify-start space-x-3 bg-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="w-8 h-8 pl-2 text-first">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        <input type="password" id="password" placeholder="Şifre" value={password} onChange={handleChangePassword}
                                className="w-full rounded-r border-l outline-none pl-3 pr-1 py-1 duration-200 border-b-4 focus:border-b-first border-b-white focus:rounded-b-0 border-first"/>
                    </div>
                    <input type="submit" value="Giriş Yap" className="py-2 px-6 border border-first text-first font-bold rounded duration-200 cursor-pointer hover:bg-first hover:text-white"/>
                </div>
            </form>
        </div>
    )
}


const SignUp = () =>{

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
                setCookie("uId",data.id,24);
                await dispatch(setUser(data));
                window.location.replace("https://localhost:44418/");
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