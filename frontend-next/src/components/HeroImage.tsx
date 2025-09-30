import { Marquee } from "./Marquee";

export const HeroImage = () => {
  return <div className="hidden md:flex md:flex-col items-center md:w-[50%] overflow-hidden bg-neutral-200">
    <img src={'/images/heroImage.png'} width={"530px"} />
    <div className="text-center flex flex-col items-center overflow-hidden">
      <p className="text-sm tracking-wider text-neutral-500 font-semibold">why SCRIBE.IO?</p>
      <div className="border [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] w-[40%] overflow-x-hidden mt-5">
        <Marquee />
      </div>
    </div>
  </div>
}
