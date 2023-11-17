import { motion } from "framer-motion"
import { Icon } from "./icon"
import { useRouter } from "next/navigation"


export function Delayer(props: any) {
  const color = props.color || 'white-100'
  const size = props.size || 'lg'

  return (
    <motion.div
      animate={{
        scale: [1, 0.9, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }}
      className="flex w-6 h-6"
    >
      <Icon className={`m-auto text-${color} text-${size}`} tag="hourglass_empty" />
    </motion.div>
  )
}