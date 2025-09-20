import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
type user = {
    fname: string;
    lname: string;
    email? :string;
    id : string
}
export interface BlogsType {
    id: string;
    title: string;
    content: string;
    user?: user;
    createdAt: string;
    _count: { blogLikes: number }
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
        user: { fname: "", lname: "" , id:""},
        createdAt: "",
        _count: { blogLikes: 0 }
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
                localStorage.removeItem("token");
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
                    return { ...b, ...response.data.data }
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

export const useUserBlog = ({ id }: { id: string }) => {
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

        axios.get(`${BACKEND_URL}api/v1/blog/profile/${id}`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                setBlogs(response.data.data)
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