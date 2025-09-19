import { useState } from "react";
import { Navbar } from "../components/Navbar"

export const Publish = ()=>{
    return <div className="background h-screen">
            <div className="flex justify-center">
                <Navbar />
            </div>
            <div className="flex justify-center mt-30 ">
                <CreatBlog />
            </div>
        </div>
}

function CreatBlog(){
    const [blogsInput , setBlogsInput] = useState();
    return <div className="w-[70%] flex justify-center">
       <div className="w-full flex justify-center items-start gap-8">
         <div className="w-[80%] flex-6">
            <input type="text" className="text-4xl border-b p-4 focus:none w-full mb-3 focus:outline-none" placeholder="Title..." />
            <textarea placeholder="Tell your story ..." className="p-4 text-2xl w-full resize-none focus:outline-none" rows={17}  ></textarea>
         </div>
         <button className=" mt-7 cursor-pointer border-x flex-1 group relative text-2xl hover:bg-neutral-400 py-1 font-semibold text-neutral-700 duration-300 rounded-2xl">Publish
             <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full "></span>
         </button>
       </div>
    </div>
}
