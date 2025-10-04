'use client'
import { Button } from "@/components/Button";
import { DarkModeToggle } from "@/components/DarkMode";
import { HeroImage } from "@/components/HeroImage";
import { NewLoginForm } from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  return <div className=" flex flex-col md:justify-around items-center h-screen mask-b-from-70% bg-transparent">
    <div className="w-[80%] flex justify-between items-center">
      <div className="dark:bg-[#E1C5A8]">
        <img src={'/images/logo.png'} width={"100"} height={"100"} className="h-auto" />
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="w-[160px]"><Button btnText="Sign up" onClick={() => { router.push('/signup') }} /></div>
        <DarkModeToggle />
      </div>
    </div>
    <div className="min-w-[100%] flex shadow-2xl rounded-2xl bg-neutral-100 md:min-w-[80%] min-h-[85%] md:overflow-hidden ">
      {/* <HeroText heroTitle={"Log in to your account"} type={"signin"} /> */}
      {/* <LoginForm heroTitle={"Log in to your account"} type={"signin"} /> */}
      <NewLoginForm heroTitle={"Log in to your account"} type={"signin"} />
      {/* <WorkingLoginForm /> */}
      <HeroImage />
    </div>
  </div>
}
