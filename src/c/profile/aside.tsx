"use client"
import { usePathname } from 'next/navigation'
import { Icon } from "../ui/icon";
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';

export default function Aside(params: any) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      style={open ? { width: '150px' } : { width: '40px' }}
      className="fixed top-0 bottom-0 left-0 transition-all z-10 bg-stone-100 text-slate-700 shadow shadow-slate-400 flex flex-col">
      <Link className="text-md flex items-center p-2" href={'/'}>
        <Image width={30} height={30} src="/assets/logo.png" alt="Минив3б" />
        {open ? <span className="ms-2 w-full text-center">Админ</span> : null}
      </Link>
      <hr className="border-stone-300" />

      <Aside__Widget>
        <Aside__Item
          open={open}
          options={{
            icon: 'dashboard',
            path: '/profile',
            title: 'Обзор'
          }} />

        <Aside__Item
          open={open}
          options={{
            icon: 'person',
            path: '/profile/person',
            title: 'Профиль'
          }} />

        <Aside__Item
          open={open}
          options={{
            icon: 'web',
            path: '/profile/sites',
            title: 'Страницы'
          }} />
      </Aside__Widget>

      <div onClick={() => setOpen(!open)} className="text-stone-100 text-xl bg-slate-700 flex mt-auto py-2 cursor-pointer">
        {open ?
          <Icon className="m-auto" tag="keyboard_tab_rtl" />
          : <Icon className="m-auto" tag="keyboard_tab" />
        }
      </div>

    </aside>
  )
}

function Aside__Widget(props: any) {
  return (
    <div className="">
      {props.children}
    </div>
  )
}

function Aside__Item(props: any) {
  const pathname = usePathname()
  const { icon, path, title } = props.options
  return (
    <div className={`cursor-pointer hover:bg-slate-700 hover:text-slate-100 border-b border-stone-300 ${pathname === path ? ' bg-slate-700 text-slate-100' : ''}`}>
      <Link
        className={`w-10 p-2 flex items-center no-underline text-xs`}
        href={path}>
        <Icon className="text-xl mx-auto" tag={icon} />
        {props.open ? <div className="profile_aside_item ms-2">{title}</div> : null}
      </Link>
    </div>
  )
}