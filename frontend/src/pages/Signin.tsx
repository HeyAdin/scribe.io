import { Button } from "../components/Button";
import logo from '../assets/logo.png';
import { HeroImage } from "../components/HeroImage";
import { HeroText } from "../components/HeroText";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
    const navigate = useNavigate();
    return <div className=" flex flex-col md:justify-around items-center background h-screen mask-b-from-70% bg-transparent">
        <div className="w-[80%] flex justify-between items-center">
            <img src={logo} width={"100"} height={"100"} className=" h-auto" />
            <div className="w-[160px]"><Button btnText="Sign up" onClick={()=>{navigate('/sign-up')}}/></div>
        </div>
        <div className="min-w-[100%] flex shadow-2xl rounded-2xl bg-neutral-100 md:min-w-[80%] min-h-[85%] md:overflow-hidden ">
            <HeroText heroTitle={"Log in to your account"} type={"signin"} />
            <HeroImage />
        </div>
    </div>
}