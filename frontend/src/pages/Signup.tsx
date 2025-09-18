import { Button } from "../components/Button";
import logo from '../assets/logo.png';
import { HeroImage } from "../components/HeroImage";
import { HeroText } from "../components/HeroText";
import { useNavigate } from "react-router-dom";
// import { motion } from 'motion/react'
export const Signup = () => {
    const navigate = useNavigate();
    return <div className="flex flex-col justify-around items-center background h-screen mask-b-from-70% bg-transparent ">
        <div className="w-[80%] flex justify-between items-center">
            <img src={logo} width={"100"} height={"100"} className=" h-auto" />
            <div className="w-[160px]"><Button btnText="Sign in" onClick={() => { navigate('/sign-in') }} /></div>
        </div>
        <div className="min-w-[80%] shadow-2xl  min-h-[85%] wrapper-class">
            <div className="flex  bg-neutral-100 min-w-[full] min-h-[100%] overflow-hidden content-class">
                <HeroText heroTitle={"Let's Get Started"} type={"signup"} />
                <HeroImage />
            </div>
        </div>
    </div>
}