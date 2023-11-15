import Aside from "@/c/profile/aside";
import { Profile } from "@/c/profile/profile";

export default async function Profile__Layout(params: any) {
  return (
    <Profile>
      <div className="h-screen flex overflow-hidden">

        <Aside />

        <main className="w-full h-full relative ms-10">
          <div className="fixed -z-10 w-full h-1/4 bg-slate-700"></div>
          {params.children}
        </main>

      </div>
    </Profile>
  )
}