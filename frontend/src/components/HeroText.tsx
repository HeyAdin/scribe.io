import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import type { userSignUpType } from "@adin.dev/common";
import { useState } from "react";
import { BACKEND_URL } from '../../config.ts'
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const HeroText = ({ type, heroTitle }: { type: "signin" | "signup", heroTitle: string }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<userSignUpType>({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    async function sendRequest() {
        try {
            if(postInputs.email == "" || postInputs.password == ""){
                setError("please provide valid inputs")
            }
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs);
            const data = response.data;
            if(!data.success){
                setError(data.msg);
                return;
            }
            setError("");
            localStorage.setItem("token", data.token);
            navigate('/blogs');
        }
        catch (e: any) {
            setError(e);
            alert(error);
        }
    }
    return <div
        className=" md:w-[50%] flex justify-center items-center">
        <div className="w-[75%] flex flex-col items-center">
            <div
                className=" w-full text-center mb-10">
                <h1 className="text-5xl font-bold tracking-wider">{heroTitle}</h1>
                <p className="text-neutral-500 text-xl leading-loose tracking-tight">Good to have you back!</p>
            </div>
            {/* input fields */}
            <div
                className="flex flex-col w-full">
                {type === "signup" ? <div className="w-full flex gap-4 ">
                    <Input inputPlaceholder="First Name" inputType="text" onChange={(e) => {
                        setPostInputs((input) => {
                            return { ...input, fname: e.target.value }
                        })
                    }} />
                    <Input inputPlaceholder="Last Name" inputType="text" onChange={(e) => {
                        setPostInputs((input) => {
                            return { ...input, lname: e.target.value }
                        })
                    }} />
                </div> : null}
                <Input inputPlaceholder="Email" inputType="text" onChange={(e) => {
                    console.log(e.target.value)
                    setPostInputs((inputs) => {
                        return { ...inputs, email: e.target.value }
                    })
                }} />
                <Input inputPlaceholder="Password" inputType="password" onChange={(e) => {
                    setPostInputs((inputs) => {
                        return { ...inputs, password: e.target.value }
                    })
                }} />
                {error ? <div className="text-red-500 text-md font-black mt-4">{error}</div>:null}
                <div className="min-w-full text-center">
                    {type === "signup" ? <Button btnText="Sign up" onClick={() => {
                        sendRequest();
                    }} /> : <Button btnText="Sign in" onClick={() => {
                        sendRequest();
                    }} />}
                </div>
            </div>
            <p className="group hover:cursor-pointer hover:text-neutral-500">
                {type === "signup" ? "Already" : "Dont't"} have an account? <Link className="group w-full" to={type === "signup" ? "/sign-in" : "/sign-up"}>{type === "signup" ? "Sign in" : "Sign up"}
                    <span className="block max-w-0 group-hover:max-w-full  transition-all duration-500 h-0.5 bg-neutral-700"></span>
                </Link>
            </p>
        </div>
    </div>
}