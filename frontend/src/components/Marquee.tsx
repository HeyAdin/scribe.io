import { motion } from "motion/react";

export const Marquee = () => {
    const words: string[] = ["READ", "WRITE", "SHARE", "EXPLORE"];

    return <div className="mx-auto">
        <div className="flex overflow-hidden">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="flex shrink-0">
                {words.map((word: string, index: number) => {
                    return <div key={index} className="pr-2 text-2xl font-bold text-neutral-800">
                        {word}
                    </div>
                })}
            </motion.div>

            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="flex shrink-0">
                {words.map((word: string, index: number) => {
                    return <div key={index} className="text-2xl pr-2 font-bold text-neutral-800">
                        {word}
                    </div>
                })}
            </motion.div>
        </div>
    </div>
}