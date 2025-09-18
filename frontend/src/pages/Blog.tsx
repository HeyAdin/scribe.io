import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import { Navbar } from "../components/Navbar";
import { BlogContent } from "../components/BlogContent";
export const Blog = () => {
    const navigate = useNavigate();
    const getToken = localStorage.getItem("token");
    if (!getToken) {
        alert("you are not signed in please sign in");
        navigate("/sign-in");
    }
    const token = `Bearer ${getToken}`;
    // useEffect(() => {
    //     axios.get(`${BACKEND_URL}api/v1/blog`, {
    //         headers: {
    //             Authorization: token
    //         }
    //     }).then((response) => {
    //         setBlogs(response.data);
    //     });

    // }, []);
    return <div className="background h-screen flex flex-col items-center ">
        <Navbar />
        <BlogContent />
    </div>
}