import { Navbar } from "@/components/Navbar"
import { ProfileDetail } from "@/components/ProfileDetail"

const Profile = () => {
  return <div className="background h-screen flex flex-col items-center ">
    <Navbar />
    <ProfileDetail />
  </div>
}

export default Profile;
