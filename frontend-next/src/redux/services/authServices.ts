import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface SigninSuccessType {
  success: boolean;
  msg: string;
  token: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}` }),
  endpoints: (build) => ({
    getSignin: build.query<SigninSuccessType, { email: string, password: string }>({
      query: ({ email, password }) => ({
        url: `api/v1/user/signin`,
        method: 'POST',
        body: { email, password }
      }),
    }),
  }),
})

// auto-generated based on the defined endpoints
export const { useLazyGetSigninQuery } = authApi;
