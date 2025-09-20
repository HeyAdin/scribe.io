import { useParams } from "react-router-dom"
import { useUserBlog, type BlogsType } from "../hooks"
import { BlogsCard } from "./DisplayBlogs"
import { BlogCardSkeleton } from "./BlogCardSkeleton"

export const ProfileDetail = () => {
    const { id } = useParams();
    const { blogs, loading, error } = useUserBlog({ id: id || "" })
    const authorName = blogs.length > 0 && blogs[0].user ? blogs[0].user.fname + " " + blogs[0].user.lname : "Anonymous";
    const email = blogs.length > 0 && blogs[0].user?.email ? blogs[0].user.email : "No email";
    return <div className="w-[80%] mt-30 p-4 overflow-hidden h-[780px] ">
        <AvatarDetails authorName = {authorName} email={email}/>
        <UsersBlog blogs={blogs} loading={loading} error={error} />
    </div>
}

const AvatarDetails = ({authorName , email}: {authorName : string , email : string}) => {
    return <div className="flex gap-7 items-center mb-5">
        <div className="rounded-full w-20 h-20 border border-gray-400 flex justify-center items-center text-5xl text-gray-700 bg-orange-50 shadow-xl">{authorName.slice(0,1)}</div>
        <div>
            <div className="text-3xl font-bold">{authorName}</div>
            <div className="text-md font-light text-gray-600">{email}</div>
        </div>
    </div>
}
interface UserBlogInputs {
    blogs: BlogsType[]
    loading: boolean,
    error: string
}
const UsersBlog = ({ blogs, loading, error }: UserBlogInputs) => {

    if (loading) {
        return <div>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </div>
    }
    if (error) {
        console.log("error got ")
        return <div className="text-2xl font-bold text-red-600">{error}</div>
    }
    return <div className="mt-8 p-4 overflow-hidden">
        <h1 className="text-4xl font-bold mb-10">Blogs</h1>
        <div className="h-[580px] pb-12 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-y-from-90%">
            {blogs.map((blog) => {
                return <BlogsCard title={blog.title} content={blog.content} publishedDate={blog.createdAt} likeCount={blog._count.blogLikes} />
            })}
        </div>
    </div>
}