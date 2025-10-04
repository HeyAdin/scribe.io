import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

interface userData {
  fname: string;
  lname: string;
}

interface BlogDataType {
  id: string;
  title: string;
  content: string;
  user: userData;
  createdAt: string;
  _count: { blogLikes: number; };
}

interface BlogsSuccessType {
  success: boolean;
  msg: string;
  data: BlogDataType[];
}

const token = Cookies.get('token');

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define a service using a base URL and expected endpoints
export const blogsApi = createApi({
  reducerPath: 'blogs',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}` }),
  endpoints: (build) => ({
    getBlogsData: build.query<BlogsSuccessType, string>({
      query: () => ({
        url: `api/v1/blog`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),
  }),
})

// auto-generated based on the defined endpoints
export const { useGetBlogsDataQuery } = blogsApi;
