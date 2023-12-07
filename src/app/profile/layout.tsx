import Aside from "@/src/c/profile/aside";
import { Profile } from "@/src/c/profile/profile";
import { auth } from "../api/auth/[...nextauth]/auth";
import { Forbidden__Page } from "@/src/c/pages/forbidden";

export default async function Profile__Layout(params: any) {

  const isAuth = await auth();
  if (!isAuth) {
    return <Forbidden__Page />
  }

  return (
    <Profile>
      <div className="h-screen flex overflow-hidden">

        <Aside />

        <main className="w-full min-h-full relative ms-10 overflow-auto pb-20">
          <div className="fixed -z-10 w-full h-1/4 bg-slate-700"></div>
          {params.children}
        </main>

      </div>
    </Profile>
  )
}