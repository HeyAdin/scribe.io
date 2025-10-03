'use client'

import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config";
import Cookies from "js-cookie";
import { toast } from "sonner";

type user = {
  fname: string;
  lname: string;
  email?: string;
  id: string
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
  const router = useRouter();
  useEffect(() => {
    const getToken = Cookies.get("token");
    console.log('token fetching in progress.')
    console.log(getToken)

    if (!getToken) {
      setError("You are not authorized");
      toast.error("You are not authorized.")
      const timer = setTimeout(() => {
        router.push("/signin");
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
        router.push("/signin");
      });
  }, [router]);

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
    user: { fname: "", lname: "", id: "" },
    createdAt: "",
    _count: { blogLikes: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getToken = Cookies.get("token");
    if (!getToken) {
      setError("You are not authorized");
      const timer = setTimeout(() => {
        router.push("/signin");
        Cookies.remove("token");
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
        router.push("/signin");
      });
  }, [router]);

  return {
    blog,
    loading,
    error
  }
}

export type userBlogsData = {
  success: boolean;
  msg: string,
  data?: BlogsType[] | { users: { fname: string, lname: string, email: string } }
}

export const useUserBlog = ({ id }: { id: string }) => {
  const [blogs, setBlogs] = useState<userBlogsData>({ success: false, msg: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  console.log(blogs)
  useEffect(() => {
    const getToken = Cookies.get("token");
    if (!getToken) {
      setError("You are not authorized");
      const timer = setTimeout(() => {
        router.push("/signin");
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
        setBlogs(response.data)
        setLoading(false);
      })
      .catch(() => {
        router.push("/signin");
      });
  }, [router]);
  return {
    blogs,
    loading,
    error
  }
} 
