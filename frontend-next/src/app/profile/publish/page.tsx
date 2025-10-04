'use client'
import { useRef, useState } from "react";
import { Navbar } from "@/components/Navbar"
import axios from "axios";
import { BACKEND_URL } from "@/config";
import Cookies from "js-cookie";

const Publish = () => {
  return <div className="background h-screen">
    <div className="flex justify-center">
      <Navbar />
    </div>
    <div className="flex justify-center mt-30 ">
      <CreatBlog />
    </div>
  </div>
}

function CreatBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  function handleSubmit() {
    if (title === "" || content === "") {
      setResponse("Ahhh! You are testing right?")
      setTimeout(() => {
        setResponse("");
      }, 1000);
      return;
    }
    else {
      axios.post(`${BACKEND_URL}api/v1/blog`, { title, content },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        }
      ).then((response) => {
        console.log("I am running everytime")
        const res = response.data
        if (res.success) {
          setResponse(res.msg);
          setTitle("");
          setContent("");
          if (titleRef.current) titleRef.current.value = "";
          if (contentRef.current) contentRef.current.value = "";
          setTimeout(() => {
            setResponse("");
          }, 1000);
          return;
        }
        setResponse("unable to create blog");
        setTitle("");
        setContent("");
        if (titleRef.current) titleRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";
        setTimeout(() => {
          setResponse("");
        }, 1000);
      })

    }
  }
  return <div className="w-[70%] flex justify-center">
    <div className="w-full flex justify-center items-start gap-8">
      <div className="w-[80%] flex-6">
        {response ? <div className="text-2xl font-semibold text-center">{response}</div> : null}
        <input ref={titleRef} onChange={(e) => {
          setTitle(e.target.value);
        }} type="text" className="text-4xl border-b p-4 focus:none w-full mb-3 focus:outline-none" placeholder="Title..." />
        <textarea ref={contentRef} onChange={(e) => {
          setContent(e.target.value);
        }} placeholder="Tell your story ..." className="p-4 text-2xl w-full resize-none focus:outline-none" rows={17}  ></textarea>
      </div>
      <button onClick={handleSubmit} className=" mt-7 cursor-pointer border-x flex-1 text-2xl hover:bg-green-600 bg-green-700 py-1 font-semibold text-neutral-200 duration-300 rounded-2xl">Publish</button>
    </div>
  </div>
}

export default Publish;
