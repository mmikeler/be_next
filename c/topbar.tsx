import Image from "next/legacy/image";
import LoginBtn from "./ui/login-btn";

export default function Topbar(params: any) {

  return (
    <div className="p-1 w-full border-b border-slate-500 flex items-center">
      <div className="me-auto text-md text-slate-600 flex items-center">
        <Image src={'/assets/logo.png'} width={30} height={30} alt="Минив3б" />
        <span className="ms-2">Минив3б</span>
      </div>
      <LoginBtn />
    </div>
  )
}