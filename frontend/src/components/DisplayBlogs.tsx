import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import like from '../assets/like.png'
export const DisplayBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const token = localStorage.getItem("token");
    if (!token) {
        alert("you are not signed in");
        navigate("/sign-in");
    }
    // useEffect(() => {
    //     axios.get(`${BACKEND_URL}api/v1/blog`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         setBlogs(response.data);
    //     });
    // }, []);
    const blog = [
        {
            authorName: "Adin Ahmad",
            title: "Why Writing Daily Changes Everything",
            content:
                "Consistency is the secret weapon of every great writer. Writing a little bit every day not only sharpens your thoughts but also helps you build an authentic voice over time...",
            publishedDate: "2025-09-18",
        },
        {
            authorName: "Sahab",
            title: "The Future of Publishing: Community Driven Platforms",
            content:
                "Digital publishing is evolving. Platforms are no longer just about content distribution, but about creating tight-knit communities where readers and writers truly connect...",
            publishedDate: "2025-09-17",
        },
        {
            authorName: "Jane Doe",
            title: "Why Consistency Beats Motivation in Programming ",
            content: `When people first start learning programming, they often depend on motivation to push them forward. At the beginning, motivation feels like a fire: you get excited, you spend hours building small projects, and you feel unstoppable. But anyone who has been on this journey long enough knows that motivation is temporary. It comes and goes, and once it fades, the real challenge begins.

Consistency is what separates programmers who progress from those who give up. You don’t need to write code for 10 hours a day to get better. Even one to two hours of focused practice every single day compounds over time. Just like fitness, the key isn’t intensity but persistence.

One of the biggest reasons consistency beats motivation is because programming is less about memorizing syntax and more about problem-solving. By writing code regularly, your brain slowly adapts to new patterns, algorithms, and logical structures. Skipping weeks or months in between practice forces you to start over again, while consistent effort builds lasting habits.

Consistency also helps you overcome frustration. Bugs and errors can feel discouraging, but if you’ve built the discipline of daily practice, you don’t give up after one bad session. Instead, you return the next day with fresh energy and continue. Over time, this creates confidence that you can solve bigger problems.

Motivation might help you start, but consistency is what helps you finish projects, land internships, and eventually build real products that matter. If you’re serious about programming, don’t wait for motivation—set a schedule, stick to it, and trust the process. In the long run, consistency will always beat motivation.`,
            publishedDate: "2025-09-15",
        },
        {
            authorName: "Sahab",
            title: "The Future of Publishing: Community Driven Platforms",
            content:
                "Digital publishing is evolving. Platforms are no longer just about content distribution, but about creating tight-knit communities where readers and writers truly connect...",
            publishedDate: "2025-09-17",
        }
    ];
    return <div className="mb-15">
        {blog.map((b, i) => (
            <BlogsCard key={i} {...b} />
        ))}
        <div 
        onClick={()=>{
            
        }}
        className="flex justify-center font-semibold text-gray-600 cursor-pointer">
            Load More...
        </div>
    </div>
}
interface BlogsCardInput {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
function BlogsCard({ authorName, title, content, publishedDate }: BlogsCardInput) {
    return <div className="border-t w-full mt-4 p-4 flex flex-col gap-4">
        <div className="flex gap-5 items-center">
            <div className="w-[30px] h-[30px] rounded-full border flex items-center justify-center text-xl font-black bg-gray-100">{authorName.slice(0, 1)}</div>
            <div className="text-gray-800 text-xl font-bold">{authorName}</div>
            <div className="text-neutral-500 ">{publishedDate}</div>
        </div>
        <div className="text-5xl w-[80%] cursor-pointer">{title}  </div>
        <div className="text-2xl text-neutral-600 line-clamp-3 cursor-pointer">{content}</div>
        <div className="flex gap-4 items-center w-full ">
            <p className="font-bold text-gray-600 cursor-pointer relative group" onClick={()=>{alert("redirecting")}}>Read full blog
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </p>
            <p className="text-gray-500">{`${Math.ceil(content.length / 200)} minute read`}</p>
            <div className="flex gap-2 text-neutral-600 font-black cursor-pointer "><img className="" src={like} height={15} width={25} />10 likes</div>
        </div>
    </div>
}