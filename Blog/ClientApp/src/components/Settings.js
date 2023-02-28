import { useEffect, useState } from "react";
import NavBar from "./Common/NavBar";

export default function Settings(){
    
    const [authorId, setAuthorId] = useState(window.location.href.split('/').slice(-1)[0]);
    const [author, setAuthor] = useState(null);

    
    const getAuthor = async ()=>{
        const response = await fetch('/account/'+authorId);
        const data = await response.json();
        setAuthor(data);
    }
    useEffect( () => {
        if(authorId){
            getAuthor();
        }
    },[authorId])
    if(author){
        return(
            <div className="settings-author mt-24">
                <NavBar page={"settings"}/>
                <h2> <b>Username</b> : {author.userName}</h2>
                <h2> <b>Email</b> : {author.email}</h2>
                <h2> <b>Id</b> : {author.id}</h2>
            </div>
        )
    }
    return(
       <div>
       <NavBar page={"settings"}/>
        <h2>Settings - {authorId}</h2>
            

       </div> 
    );
}