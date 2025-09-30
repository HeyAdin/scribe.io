'use client'
import { useRouter, useParams } from "next/navigation";
import { useBlogDetail } from "../hooks"
import { BACKEND_URL, formatDate } from "@/config";
import { useEffect, useState } from "react";
import axios from "axios";

export const BlogsDetail = () => {
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState(0);
  const params = useParams<{ blogs_id: string }>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}api/v1/blog/like/${params.blogs_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        if (response.data.success) {
          setLiked(response.data.data);
        }
      });
  }, [liked]);


  const { blog, loading, error } = useBlogDetail({ id: params.blogs_id || "" });

  if (error) {
    console.log("error got ")
    return <div className="text-2xl font-bold text-red-600">{error}</div>
  }
  if (loading) {
    return (
      <div className="flex mt-35 justify-center w-[80%] gap-8">
        <FullBlogSkeleton />
        <UserDescriptionSkeleton />
      </div>
    );
  }
  const authorName = blog.user ? blog.user.fname + " " + blog.user.lname : "Anonymous";
  const publishedDate = formatDate(blog.createdAt)
  const userId = blog.user ? blog.user.id : "";
  return <div className="flex mt-35 justify-center gap-8 w-[80%] h-[750px] ">
    <div className="overflow-hidden overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-y-from-90% ">
      <FullBlog title={blog.title} content={blog.content} publishedDate={publishedDate} id={params.blogs_id} clicked={clicked} setClicked={setClicked} liked={liked} setLiked={setLiked} />
    </div>
    <UserDescription authorName={authorName} userId={userId} />
  </div>
}


interface BlogsCardInput {
  id?: string;
  authorName?: string;
  title: string;
  content: string;
  publishedDate: string;
  liked: number,
  setLiked: (value: number) => void,
  clicked: boolean,
  setClicked: (value: boolean) => void
}
function FullBlog({ id, title, content, publishedDate, liked, setLiked, clicked, setClicked }: BlogsCardInput) {
  async function handleClick() {
    if (clicked) {
      await axios.patch(`${BACKEND_URL}api/v1/blog/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setLiked(liked - 1);
      setClicked(false);

    } else {
      await axios.patch(`${BACKEND_URL}api/v1/blog/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setLiked(liked + 1);
      setClicked(true);
    }
  };
  return <div className=" w-full p-4 py-10 flex flex-col gap-4">
    <div className="text-5xl w-[80%] cursor-pointer leading-15 font-semibold">{title}  </div>
    <div className="text-neutral-500 ">{`Posted on ${publishedDate}`}</div>
    <div className="text-2xl text-neutral-600 cursor-pointer tracking-wide leading-8">{content}</div>
    <div className="flex gap-4 items-center w-full">
      <div className={`flex gap-2 font-black cursor-pointer ${clicked ? "text-gray-400 cursor-not-allowed" : "text-neutral-600"
        }`} onClick={handleClick}  ><img className="" src={'/images/like.png'} height={15} width={25} />{liked} likes</div>
    </div>
  </div>
}

function UserDescription({ authorName, userId }: { authorName: string, userId: string }) {
  const router = useRouter();
  return <div className="min-w-[30%] p-4 ">
    <div className="text-3xl font-semibold text-neutral-600 mb-8">Author</div>
    <div className="flex gap-6 justify-center items-center cursor-pointer" onClick={() => { router.push(`/profile/${userId}`) }}>
      <div className="rounded-full w-12 h-12 border-[1px] border-gray-400  text-neutral-500 flex justify-center items-center text-2xl font-semibold shrink-0">
        {authorName.slice(0, 1).toLocaleUpperCase()}
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-3xl font-semibold text-neutral-600">
          {authorName}
        </div>
        <div className="text-neutral-500 text-xl">
          An enthusiastic guy with a deeper knowledge in mern stack building project with the help of hands
        </div>
      </div>
    </div>
  </div>
}

function UserDescriptionSkeleton() {
  return (
    <div className="min-w-[30%] p-4 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
      <div className="flex gap-6 items-center">
        <div className="rounded-full w-12 h-12 bg-gray-300"></div>
        <div className="flex flex-col gap-3 w-full">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}

function FullBlogSkeleton() {
  return (
    <div className="w-full p-4 flex flex-col gap-4 animate-pulse">
      <div className="h-10 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-6 bg-gray-200 rounded w-full"></div>
      <div className="h-6 bg-gray-200 rounded w-5/6"></div>
      <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      <div className="flex gap-4 items-center w-full">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
