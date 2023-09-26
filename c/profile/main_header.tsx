import { Avatar } from "../ui/login-btn"


export default function Main__Header(props: any) {
  const { title } = props

  return (
    <div className="flex items-center text-stone-100">
      <div className="text-xl px-6">{title}</div>
      <div className="ms-auto relative w-12 h-12 rounded-full overflow-hidden m-1">
        <Avatar />
      </div>
    </div>
  )
}