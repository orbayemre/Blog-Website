import {useSelector} from "react-redux";
import NavBar from "./Common/NavBar";
import toast from "react-hot-toast";
import {useState} from "react";

export default function Home(){

    const {user} = useSelector(state => state.auth);

    if(user === "no user"){
        return(
            <>
                <NavBar page={"home"}/>
            </>
        )
    }
    else{
        return(
            <>
                <NavBar page={"home"}/>
            </>
        )
    }
}
/*
 const [data,setData] = useState("");
    const handledd = async ()=>{
        const response = await fetch('/story/2f1defbc-55b1-4e71-875c-db52c815f11a', );
        const data = await response.json();
        console.log(data);
        setData(data);
    }
    <div className="mt-32" onClick={handledd}>ddddd</div>
    <div dangerouslySetInnerHTML={{__html: data?.content}} />
*/
