import {useDispatch,useSelector} from "react-redux";
import {setUser} from "../Stores/auth";
import useGetUser from "../Hooks/useGetUser";
import {useEffect} from "react";

export default function Home(){
    const userData = useGetUser();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);

    useEffect(()=>{
        if(userData){
            dispatch(setUser(userData));
            // userhave state i true yap
            //loading state i false yap
        }
        else if (userData === "no user"){
            // userhave state i false yap
            //loading state i false yap
        }
        else{
            //loading state i true yap
        }
    },[userData]);
    console.log(user);
    return(
            <div className="text-blue-700 text-2xl">
            HOME PAGE
            </div>
    )
}