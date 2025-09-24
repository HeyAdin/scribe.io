import { useBlogs } from "../hooks";
import like from '../assets/like.png'
import { useNavigate } from "react-router-dom";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { formatDate } from "../../config";
export const DisplayBlogs = () => {
    const { blogs, loading, error } = useBlogs();
    console.log(loading);
    if (loading) {
        return <div className="mt-10">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </div>
    }
    if (error) {
        console.log("error got ")
        return <div className="text-2xl font-bold text-red-600">{error}</div>
    }
    return <div className="mb-15">
        {blogs.map((b, i) => {
            const publishedDate = formatDate(b.createdAt)
            const authorName = b.user ? `${b.user.fname} ${b.user.lname}` : "Unknown Author";
            const likeCount = b._count.blogLikes;
            return <BlogsCard key={i} authorName={authorName} title={b.title} content={b.content} publishedDate={publishedDate} id={b.id} likeCount={likeCount} />
        }
        )}
        {blogs.length == 0 ? <div
            className="flex justify-center font-semibold text-gray-600 cursor-pointer mt-10">
            No one has written any blog yet. Be the first one to write a blog!
        </div> :<div
            onClick={() => {

            }}
            className="flex justify-center font-semibold text-gray-600 cursor-pointer mt-10">
            Load More...
        </div>}
    </div>
}
interface BlogsCardInput {
    id?: string;
    authorName?: string;
    title: string;
    content: string;
    publishedDate: string;
    likeCount : number;
}
export function BlogsCard({ authorName, title, content, publishedDate, id, likeCount }: BlogsCardInput) {
     
    const navigate = useNavigate();
    return <div className="border-t w-full mt-4 p-4 flex flex-col gap-4">
        <div className="flex gap-5 items-center">
            {authorName?<div className="w-[30px] h-[30px] rounded-full border flex items-center justify-center text-xl font-black bg-gray-100">{authorName? authorName.slice(0, 1):null}</div>:null}
            <div className="text-gray-800 text-xl font-bold">{authorName}</div>
            <div className="text-neutral-500 ">{publishedDate}</div>
        </div>
        <div onClick={() => {
            navigate(`/blogs/${id}`);
        }} className="text-5xl w-[80%] cursor-pointer">{title}  </div>
        <div onClick={() => {
            navigate(`/blogs/${id}`);
        }} className="text-2xl text-neutral-600 line-clamp-3 cursor-pointer">{content}</div>
        <div className="flex gap-4 items-center w-full ">
            <p className="font-bold text-gray-600 cursor-pointer relative group" onClick={() => { navigate(`/blogs/${id}`) }}>Read full blog
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </p>
            <p className="text-gray-500">{`${Math.ceil(content.length / 200)} minute read`}</p>
            <div className="flex gap-2 text-neutral-600 font-black cursor-pointer "><img className="" src={like} height={15} width={25} />{likeCount} likes</div>
        </div>
    </div>
}