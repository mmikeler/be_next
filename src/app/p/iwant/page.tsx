import { Icon } from "@/src/c/ui/icon";
import Link from "next/link";


export default function Page(params: any) {
  return (
    <div
      style={{ background: 'url("/assets/bg2.jpg") no-repeat left top / cover' }}
      className="p-5 flex h-screen">
      <div className="m-auto">
        <Icon className="text-4xl text-gray-500 text-center w-full" tag="code_blocks" />
        <div className="mt-3">
          Раздел находится в разработке
        </div>
        <Link className="w-fit block mt-10 mx-auto" href="/">
          <div className="w-fit p-1 px-3  border-2 border-slate-600 rounded cursor-pointer">
            На главную
          </div>
        </Link>
      </div>
    </div>
  )
}