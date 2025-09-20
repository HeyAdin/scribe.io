import { Navbar } from "../components/Navbar"
import { ProfileDetail } from "../components/ProfileDetai"

export const Profile = ()=>{
    return <div className="background h-screen flex flex-col items-center ">
            <Navbar />
            <ProfileDetail />
        </div>
}