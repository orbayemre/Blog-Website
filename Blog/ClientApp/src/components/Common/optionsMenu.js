import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

export default function OptionsMenu({storyId}){
    const handleEdit = () =>{
        window.location.replace("https://localhost:44418/update/"+storyId)
    }
    const handleDelete = async () =>{

        const response = await fetch('/story/'+storyId, {
            method: 'DELETE'});
        const data = await response.json();
        window.location.replace("https://localhost:44418/mystories");
        console.log(data);
    }

    return(
        <Menu>
            <Menu.Button  className="cursor-pointer flex justify-center items-start space-x-3 rounded-md bg-black bg-opacity-0 duration-200 px-2 py-2 text-sm font-medium text-second hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
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
                <Menu.Items className="absolute z-20 top-10 right-2 mt-0.5 w-28 fontSignika origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">
                        <Menu.Item>
                            <div>
                                <div onClick={handleEdit}  className="text-first bg-second duration-200  cursor-pointer group rounded-t hover:bg-second/80
                                                flex w-full items-center space-x-2 px-4 py-2 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span>Düzenle</span>
                                </div>
                            </div>
                        </Menu.Item>
                    </div>
                    <div className="">
                        <Menu.Item>
                            <div>
                                <div onClick={handleDelete}  className="text-first bg-second duration-200  cursor-pointer group rounded-b hover:bg-second/80
                                                flex w-full items-center space-x-2 px-4 py-2 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    <span>Sil</span>
                                </div>
                            </div>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}