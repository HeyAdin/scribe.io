import { useNavigate, useParams } from "react-router-dom";
import { useBlogDetail } from "../hooks"
import like from '../assets/like.png'

export const BlogsDetail = () => {
    const { id } = useParams();
    const { blog, loading, error } = useBlogDetail({ id: id || "" });
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
    const authorName = blog.user.fname + " " + blog.user.lname;
    return <div className="flex mt-35 justify-center w-[80%] gap-8">
        <div className="">
            <FullBlog title={blog.title} content={blog.content} publishedDate={blog.publishedDate} />
        </div>
        <UserDescription authorName={authorName} />
    </div>
}


interface BlogsCardInput {
    id?: string;
    authorName?: string;
    title: string;
    content: string;
    publishedDate: string;
}
function FullBlog({ title, content, publishedDate }: BlogsCardInput) {
    return <div className=" w-full p-4 flex flex-col gap-4  ">
        <div className="text-5xl w-[80%] cursor-pointer leading-15 font-semibold">{title}  </div>
        <div className="text-neutral-500 ">{`Posted on ${publishedDate}`}</div>
        <div className="text-2xl text-neutral-600 cursor-pointer tracking-wide leading-8">{content}</div>
        <div className="flex gap-4 items-center w-full ">
            <div className="flex gap-2 text-neutral-600 font-black cursor-pointer "><img className="" src={like} height={15} width={25} />10 likes</div>
        </div>
    </div>
}

function UserDescription({ authorName }: { authorName: string }) {
    return <div className="min-w-[30%] p-4 ">
        <div className="text-3xl font-semibold text-neutral-600 mb-8">Author</div>
        <div className="flex gap-6 justify-center items-center">
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