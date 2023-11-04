"use client"
import { usePathname } from 'next/navigation'
import { Icon } from "../ui/icon";
import Link from "next/link";

export default function Aside(params: any) {
  return (
    <aside
      style={{ width: 'max(150px)' }}
      className="bg-stone-100 text-slate-700 shadow shadow-slate-400">
      <Link className="text-md h-14 flex items-center px-3" href={'/'}>miniw3b Admin</Link>
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
    <div className={`p-3 cursor-pointer hover:bg-slate-700 hover:text-slate-100 ${pathname === path ? 'border-l-8 border-slate-700' : ''}`}>
      <Link
        className={`flex items-center no-underline text-xs`}
        href={path}>
        <Icon className="text-2xl" tag={icon} />
        <div className="mx-1"></div>
        {title}
      </Link>
    </div>
  )
}