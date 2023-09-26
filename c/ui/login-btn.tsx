"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import React, { useRef, useState } from 'react';
import { motion } from "framer-motion"
import Menu from "./menu";

export default function LoginBtn() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div onClick={() => setOpen(!open)} className="flex cursor-pointer">
          <Image className="rounded-full" src={session.user?.image} alt="miniweb" width={40} height={40} />
        </div>

        {open &&
          <motion.div
            initial={{ opacity: 0, top: 100 }}
            animate={{ opacity: 1, top: 35 }}
            ref={menu}
            className={`fixed mt-6 bg-stone-800 text-stone-100 rounded p-3`} style={{ minWidth: '120px' }}>
            <Menu />
          </motion.div>}
      </>
    )
  }
  return (
    <div className="p-2 bg-slate-700 text-stone-100 rounded" onClick={() => signIn()}>
      Войти
    </div>
  )
}

export function Avatar(params: any) {
  const { data: session } = useSession()
  return (
    session &&
    <Image fill src={session.user?.image} alt="" />
  )
}