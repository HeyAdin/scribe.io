'use client'
import { BlogsDetail } from "@/components/BlogsDetail"
import { Navbar } from "@/components/Navbar"
import { useParams } from "next/navigation"

const ViewBlogs = () => {
  const params = useParams<{ blogs_id: string }>()
  console.log(params.blogs_id)
  return <div className="background h-screen overflow-hidden">
    <div className="flex justify-center">
      <Navbar />
    </div>
    <div className="flex justify-center ">
      <BlogsDetail />
    </div>
  </div>
}

export default ViewBlogs;
