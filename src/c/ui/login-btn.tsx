"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import React, { useRef, useState } from 'react';
import { motion } from "framer-motion"
import Menu from "./menu";
import { Icon } from "./icon";

export default function LoginBtn() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div onClick={() => setOpen(!open)} className="relative flex cursor-pointer">
          <Image className="rounded-full" src={session.user?.image || ''} alt="miniweb" width={40} height={40} />
        </div>

        {open &&
          <motion.div
            initial={{ opacity: 0, top: 100 }}
            animate={{ opacity: 1, top: 48 }}
            ref={menu}
            className={`absolute right-1 bg-stone-800 text-stone-100 rounded p-3`} style={{ minWidth: '120px', zIndex: '999' }}>
            <Menu />
          </motion.div>}
      </>
    )
  }
  return (
    <div
      className="flex items-center cursor-pointer px-3 text-sm text-slate-700"
      onClick={() => signIn()}>
      <Icon className="me-1" tag="login" />
      Войти
    </div>
  )
}

export function Avatar(params: any) {
  const { data: session } = useSession()
  return (
    session &&
    <Image fill src={session.user?.image || ''} alt="" />
  )
}

export function CustomLoginBtn(params: any) {
  return (
    <div
      onClick={() => signIn()}
      className="uppercase cursor-pointer rounded w-11/12 mt-2 mx-auto bg-sky-500 hover:bg-sky-700 transition-all text-white text-lg p-3 text-center">
      <span><Icon tag="person_play" /></span> начать творить бесплатно <span><Icon tag="person_play" /></span>
    </div>
  )
}