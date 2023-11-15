"use client"

import { Avatar } from "../ui/login-btn"
import { useSession, signIn, signOut } from "next-auth/react"
import { User__Score } from "./user_score"

export default function Main__Header(props: any) {
  const { title } = props
  const { data: session } = useSession()

  return (
    <div className="flex items-center text-stone-100 p-6">
      <div className="text-xl">{title}</div>
      <div className="ms-auto relative w-12 h-12 rounded-full overflow-hidden border-2">
        <Avatar />
      </div>
      <div className="ms-2 text-xs">
        <div className="">{session?.user?.name}</div>
        <User__Score user_email={session?.user?.email || ''} />
      </div>
    </div>
  )
}

