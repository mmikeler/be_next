import Aside from "@/c/profile/aside";

export default function Profile__Layout(params: any) {

  return (
    <div className="h-screen flex overflow-hidden">

      <Aside />

      <main className="w-9/12 h-full relative">
        <div className="fixed -z-10 w-full h-1/4 bg-slate-700"></div>
        {params.children}
      </main>

    </div>
  )
}