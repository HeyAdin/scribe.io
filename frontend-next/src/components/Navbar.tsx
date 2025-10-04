'use client'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { removeAuthTokenCookies } from "@/redux/features/authTokenSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setAuthState } from "@/redux/features/authTokenSlice";


export const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.auth.AuthData.id);

  useEffect(() => {
    dispatch(setAuthState());
  }, [])

  return <div className="w-[80%] flex justify-between items-center fixed z-10">
    <img onClick={() => router.push('/blogs')} src={'/images/logo.png'} width={"100"} height={"100"} className=" h-auto cursor-pointer" />
    <div className='flex list-none gap-5 text-lg text-neutral-700 font-semibold'>
      <li className='cursor-pointer hover:text-neutral-500' onClick={() => { router.push("/profile/publish") }}>Create</li>
      <li className='cursor-pointer hover:text-neutral-500' onClick={() => { router.push("/blogs") }}>Home</li>
      <li className='group relative cursor-pointer'>
        <div className='hover:border-b hover:text-neutral-500' onClick={() => { router.push(`/profile/${id}`) }} >Profile</div>
        <motion.div
          className='group-hover:flex flex-col hidden absolute w-[70px] '>
          <div className='hover:border-b  hover:text-neutral-500' onClick={() => { router.push("/blogs") }}>Settings</div>
          <div className='hover:border-b  hover:text-neutral-500' onClick={() => {
            dispatch(removeAuthTokenCookies());
            router.push("/signin");
          }}>Sign out</div>
        </motion.div>
      </li>
    </div>
  </div >
}
