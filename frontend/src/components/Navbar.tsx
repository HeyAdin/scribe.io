import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { motion } from "motion/react"
import { jwtDecode } from 'jwt-decode';
export const Navbar = () => {
    const navigate = useNavigate();
    let id:string;
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/sign-in");
    }
    else {
        const decoded: { id: string, iat: number } = jwtDecode(localStorage.getItem("token") || "") || "";
         id = decoded.id;
    }
    return <div className="w-[80%] flex justify-between items-center fixed z-10">
        <img onClick={() => navigate('/blogs')} src={logo} width={"100"} height={"100"} className=" h-auto cursor-pointer" />
        <div className='flex list-none gap-5 text-lg text-neutral-700 font-semibold'>
            <li className='cursor-pointer hover:text-neutral-500' onClick={() => { navigate("/profile/publish") }}>Create</li>
            <li className='cursor-pointer hover:text-neutral-500' onClick={() => { navigate("/blogs") }}>Home</li>
            <li className='group relative cursor-pointer'>
                <div className='hover:border-b hover:text-neutral-500' onClick={() => { navigate(`/profile/${id}`) }} >Profile</div>
                <motion.div
                    className='group-hover:flex flex-col hidden absolute w-[70px] '>
                    <div className='hover:border-b  hover:text-neutral-500' onClick={() => { navigate("/blogs") }}>Settings</div>
                    <div className='hover:border-b  hover:text-neutral-500' onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/sign-in")
                    }}>Sign out</div>
                </motion.div>
            </li>
        </div>
    </div>
}