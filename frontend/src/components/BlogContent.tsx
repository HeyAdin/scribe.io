import write from '../assets/write.png'
import { DisplayBlogs } from './DisplayBlogs'
export const BlogContent = () => {
    return <div className=" mt-25 pt-10 w-[80%]  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-y-from-90%">
        <div className='flex justify-between items-end'>
            <h1 className="text-4xl font-black w-[15%]">Featured Blogs</h1>
            <div className='text-3xl font-bold flex items-center relative cursor-pointer group'>Write? <img className='w-7 h-7' src={write} />
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </div>
        </div>
        <DisplayBlogs />
    </div>
}