import React, { useState } from "react";
import ReactQuill,{ Quill }  from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import toast,{Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

Quill.register('modules/imageResize', ImageResize);

const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': 1 }, { 'header': 2 },],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
    ],
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    }
};

const formats = [
    'font',
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
];

function Editor({editorType="new",data={title:"",content:""},userId,storyId}) {

    const [titleValue,setTitleValue] = useState(data.title);
    const [contentValue,setContentValue] = useState(data.content);
    const navigate = useNavigate();

    const handleChange = (content, delta, source, editor) => {
        //console.log(editor.getHTML());  html 사용시
        //console.log(JSON.stringify(editor.getContents())); // delta 사용시
        setContentValue(editor.getHTML());
    };
    const extractContent = (data) => {
        var span = document.createElement('span');
        span.innerHTML = data;
        return span.textContent || span.innerText;
    };

    const handleSave = async ()=>{

        if(extractContent(contentValue) === "") toast.error("İçerik olmadan kaydedemezsiniz.");
        else if(titleValue === "") toast.error("Başlık zorunludur.");
        else if(editorType === "new"){
                const response = await fetch('/story', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Title:titleValue,Content:contentValue,UserId:userId})
                });
                const data = await response.json();
                toast.success("Kaydedildi.");
                //hata mesajı da yazdırılacak
                navigate("/mystories");
                // window.location.replace("https://localhost:44418/mystories");
        }
        else if(editorType === "update"){
            const response = await fetch('/story', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({StoryId:storyId,Title:titleValue,Content:contentValue})
            });
            const data = await response.json();
            toast.success("Kaydedildi.");
            //hata mesajı da yazdırılacak
            navigate("/mystories");
            //window.location.replace("https://localhost:44418/mystories");
        }


    }
    const handleCancel = async () =>{
        setTitleValue(data.title);
        setContentValue(data.content);
        toast.success("Değişiklikler iptal edildi.")
    }
    return (
        <>
            <div className="w55">
                <input placeholder="Başlık" value={titleValue} onChange={(e)=> setTitleValue(e.target.value)} className="w-full shadow py-2 px-4 outline-none bg-white mb-4 border border-gray-300"/>
                <ReactQuill
                    className="mb-12"
                    style={{ height: "600px"}}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={contentValue}
                    onChange={handleChange}
                />
                <div className="w-full fontSignika mt-16 mb-2 flex items-center justify-end space-x-6">
                    <span onClick={handleSave} className="w-28 text-green-600 border-2 border-green-600 shadow-xl hover:bg-green-600 hover:text-white transition duration-200 py-2 px-4 flex items-center justify-center rounded-lg cursor-pointer">
                        {editorType==="new" ? "Kaydet" : "Güncelle"}
                    </span>
                    <span onClick={handleCancel} className="w-20 text-red-600 border-2 border-red-600 shadow-xl hover:bg-red-600 hover:text-white transition duration-200 py-2 px-4 flex items-center justify-center rounded-lg cursor-pointer">İptal</span>
                </div>
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}/>
        </>
    );
}


export default Editor;