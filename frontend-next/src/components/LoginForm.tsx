'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { toast } from "sonner";
// import { BACKEND_URL } from '@/config'
import { useRouter } from "next/navigation";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useLazyGetSigninQuery } from "@/redux/services/authServices";
import { useDispatch } from "react-redux";
import { setAuthTokenCookies } from "@/redux/features/authTokenSlice";

interface LoginData {
  success: boolean;
  msg: string;
  token: string;
}

export const NewLoginForm = ({ type, heroTitle }: { type: "signin" | "signup", heroTitle: string }) => {
  const [triggerSignin] = useLazyGetSigninQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const emailEntry = formData.get("email");
      const passwordEntry = formData.get('password');
      // const response = await fetch(`${BACKEND_URL}api/v1/user/signin`, {
      //   method: "POST",
      //   body: JSON.stringify({ email, password })
      // })
      // const { data } = await useLazyGetSigninQuery({ email, password }).unwrap();
      if (typeof emailEntry !== "string" || typeof passwordEntry !== "string") {
        toast.error("Invalid form data: email and password must be strings.")
        throw new Error("Invalid form data: email and password must be strings.");
      }
      const email: string = emailEntry;
      const password: string = passwordEntry;
      const successData = await triggerSignin({ email, password }).unwrap();
      // const successData: LoginData = await ;
      // const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
      // Cookies.set("token", successData.token, { secure: true, expires: oneHourFromNow, path: "/" });
      dispatch(setAuthTokenCookies({ token: successData.token }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error with the api.")
      }
    } finally {
      toast.success("success");
      router.push("/blogs")
    }
  }
  return <div className="md:w-[50%] flex justify-center items-center">
    <div className="w-[75%] flex flex-col items-center">
      <div
        className=" w-full text-center mb-10">
        <h1 className="text-5xl font-bold tracking-wider dark:text-primary-foreground">{heroTitle}</h1>
        <p className="text-neutral-500 text-xl leading-loose tracking-tight">Good to have you back!</p>
      </div>
      {/* Login Form */}
      <form className="w-full" onSubmit={handleLoginSubmit}>
        <div className="flex flex-col gap-6">
          <Input
            className="border py-2 px-3 rounded-md my-2 text-xl input w-full border-black shadow-[2.5px_3px_0_#000] outline-none transition ease-in-out duration-200 focus:shadow-[5.5px_7px_0_#000]"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          <Input
            className="border py-2 px-3 rounded-md my-2 text-xl input w-full border-black shadow-[2.5px_3px_0_#000] outline-none transition ease-in-out duration-200 focus:shadow-[5.5px_7px_0_#000]"
            name="password"
            type="password"
            required
          />
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="button px-3 py-2 rounded-md w-full tracking-wider my-5 text-white cursor-pointer border border-black bg-black transition duration-300 hover:text-black hover:bg-[#E1C5A8] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_0_#000] active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
              Sigin
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </div>
  </div>
}

