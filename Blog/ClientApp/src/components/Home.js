import {useSelector} from "react-redux";

export default function Home(){
    const {user} = useSelector(state => state.auth);
    console.log(user);
    return(
            <div className="text-blue-700 text-2xl">
            HOME PAGE
            </div>
    )
}