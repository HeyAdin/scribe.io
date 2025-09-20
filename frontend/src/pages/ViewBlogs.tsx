import { BlogsDetail } from "../components/BlogsDetail"
import { Navbar } from "../components/Navbar"

export const ViewBlogs = () => {
    return <div className="background h-screen overflow-hidden">
        <div className="flex justify-center">
            <Navbar />
        </div>
        <div className="flex justify-center ">
            <BlogsDetail />
        </div>
    </div>
}