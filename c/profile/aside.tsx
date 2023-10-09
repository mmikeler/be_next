"use client"
import { usePathname } from 'next/navigation'
import { Icon } from "../ui/icon";
import Link from "next/link";

export default function Aside(params: any) {
  return (
    <aside className="bg-stone-100 w-3/12 max-w-xs text-stone-700 shadow shadow-slate-400">
      <Link className="text-xl h-14 flex items-center px-3" href={'/'}>Be Next Admin</Link>
      <hr className="mx-3" />

      <Aside__Widget>
        <Aside__Item options={{
          icon: 'dashboard',
          path: '/profile',
          title: 'Обзор'
        }} />

        <Aside__Item options={{
          icon: 'person',
          path: '/profile/person',
          title: 'Профиль'
        }} />

        <Aside__Item options={{
          icon: 'web',
          path: '/profile/sites',
          title: 'Минисайты'
        }} />
      </Aside__Widget>

    </aside>
  )
}

function Aside__Widget(props: any) {

  return (
    <div className="">
      {props.children}
      <hr className="mx-3" />
    </div>
  )
}

function Aside__Item(props: any) {
  const pathname = usePathname()
  const { icon, path, title } = props.options
  return (
    <div className={`p-3 cursor-pointer ${pathname === path ? 'border-l-8 border-slate-700' : 'hover:bg-slate-700 hover:text-slate-100'}`}>
      <Link
        className={`flex items-center `}
        href={path}>
        <Icon tag={icon} />
        <div className="mx-1"></div>
        {title}
      </Link>
    </div>
  )
}