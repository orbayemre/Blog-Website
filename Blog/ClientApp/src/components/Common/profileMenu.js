import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../../Stores/auth";

export default function ProfileMenu({user}){

    const dispatch = useDispatch();

    const handleLogOut = async ()=>{
        const response = await fetch('account/logout', {method: 'POST'});
        const data = await response.json();
        window.location.reload();
        console.log(data);
        dispatch(setUser("no user"));
    }
    return(
        <div className="absolute right-6">
            <Menu>
                <Menu.Button  className="cursor-pointer flex justify-center items-start space-x-3 rounded-md bg-black bg-opacity-0 duration-200 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="text-first w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div className="flex flex-col items-start space-y-0 justify-center ">
                        <span className="text-first leading-3">{user.userName}</span>
                        <span className="text-first/50 ">{user.email}</span>
                    </div>
                </Menu.Button >
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-0.5 w-full origin-top-right divide-y divide-baseColor rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="">
                            <Menu.Item>
                                <div>
                                    <div onClick={handleLogOut} className="text-second bg-first duration-200 hover:bg-firstHover cursor-pointer group rounded
                                                flex w-full items-center space-x-2 px-4 py-2 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        <span>Çıkış yap</span>
                                    </div>
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>

    )
}