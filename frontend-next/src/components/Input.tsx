import type { ChangeEvent } from "react"

type inputTypes = {
    inputPlaceholder : string,
    inputType : string,
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
}
export const Input =({inputPlaceholder , inputType , onChange} : inputTypes)=>{
    return <input 
    placeholder={inputPlaceholder}
    type={inputType}
    onChange={onChange}
    className="border py-2 px-3 rounded-md my-2 text-xl input w-full border-black  
             shadow-[2.5px_3px_0_#000] outline-none transition ease-in-out duration-200 
             focus:shadow-[5.5px_7px_0_#000]"
     />
} 