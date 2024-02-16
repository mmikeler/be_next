import { Forbidden__Page } from "@/src/c/pages/forbidden";
import { auth } from "../api/auth/[...nextauth]/auth";
import LoginBtn from "@/src/c/ui/login-btn";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isAuth = await auth();
  if (!isAuth) {
    return <Forbidden__Page />
  }

  return (
    <>
      <div className="bg-slate-900 flex items-center p-1 text-white">
        <Link href={'/'}>
          <Image
            src={'/assets/logo.png'}
            width={40}
            height={40}
            alt="miniw3b"
          />
        </Link>
        <div className="mx-2 text-xl">Miniw3b.Admin</div>
        <div className="mx-auto">
          <Link className={`mx-2`} href="/admin">Пользователи</Link>
          <Link className={`mx-2`} href="/admin/sites">Сайты</Link>
        </div>
        <LoginBtn />
      </div>
      <div className="mx-auto bg-slate-700 text-white overflow-x-auto min-h-screen">
        {children}
      </div>
    </>
  )
}