import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
type user = {
    fname: string;
    lname: string;
}
interface BlogsType {
    id: string;
    title: string;
    content: string;
    user: user
    publishedDate: string
}
export const useBlogs = () => {
    const [blogs, setBlogs] = useState<BlogsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const getToken = localStorage.getItem("token");

        if (!getToken) {
            setError("You are not authorized");
            const timer = setTimeout(() => {
                navigate("/sign-in");
            }, 700);

            return () => clearTimeout(timer);
        }

        const token = `Bearer ${getToken}`;

        axios
            .get(`${BACKEND_URL}api/v1/blog`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setBlogs(response.data.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/sign-in");
            });
    }, [navigate]);

    return {
        blogs,
        loading,
        error
    }
}


export const useBlogDetail = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<BlogsType>({
        id: "",
        title: "",
        content: "",
        user: { fname: "", lname: "" },
        publishedDate: "2025-07-12"
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (!getToken) {
            setError("You are not authorized");
            const timer = setTimeout(() => {
                navigate("/sign-in");
            }, 700);

            return () => clearTimeout(timer);
        }

        const token = `Bearer ${getToken}`;

        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                setBlog((b) => {
                    return { ...b ,  ...response.data.data}
                });
                setLoading(false);
            })
            .catch(() => {
                navigate("/sign-in");
            });
    }, [navigate]);

    return {
        blog,
        loading,
        error
    }
}