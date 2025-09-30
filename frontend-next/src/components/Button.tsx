
type buttonInput = {
    btnText: string,
    onClick : ()=> void
}
export const Button = ({ btnText , onClick }: buttonInput) => {
    return <button 
    onClick={onClick}
    className="button px-3 py-2 rounded-md w-full tracking-wider my-5 text-white cursor-pointer border border-black
             bg-black transition duration-300 
             hover:text-black hover:bg-[#E1C5A8] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_0_#000]
             active:translate-x-0 active:translate-y-0 active:shadow-none">
        {btnText}
    </button>
}