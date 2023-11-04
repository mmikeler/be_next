"use client"

import Topbar from '@/c/topbar'
import Link from 'next/dist/client/link'
import { motion } from "framer-motion"
import { Icon } from '@/c/ui/icon'

export default function Home() {
  const btnMod = 'bg-blue-500 text-stone-100 rounded p-1 px-3 hover:bg-blue-600 transition-all cursor-pointer';
  return (
    <>
      <main
        style={{ width: '360px' }}
        className="min-h-screen mx-auto bg-slate-700 shadow">

        <Topbar />

        <div
          className='m-auto px-3 py-10 relative bg-slate-700 rounded'>
          <h1 className='text-center text-5xl text-stone-100'>&quot;MiniW3B&quot;</h1>
          <div className="text-center w-80 mb-5 text-lg text-stone-100 mt-5">Бесплатный элементарный конструктор сайтов без использования шаблонов.</div>
          <div className='text-center w-80 mb-5 text-lg text-stone-100'>Просто и быстро создавайте сайты с уникальным авторским дизайном.</div>
          <div className='text-center w-80 mb-10 text-lg text-stone-100'>Оптимизировано для смартфонов.</div>
          <div className="flex items-center justify-around">
            <Link className={btnMod} href="https://vk.com">Вконтакте</Link>
            <Link className={btnMod} href="https://t.me">Telegram</Link>
          </div>
        </div>

        <div className="w-full">
          <div className="p-3"><Link href="/m/ns_3">Пример сайта</Link></div>
        </div>

      </main>
    </>
  )
}
