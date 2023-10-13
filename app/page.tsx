"use client"

import Topbar from '@/c/topbar'
import Link from 'next/dist/client/link'
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">

        <Topbar />

        <motion.div
          initial={{ opacity: 0, top: 30 }}
          animate={{ opacity: 1, top: 0 }}
          className='m-auto p-3 relative'>
          <h1 className='text-center text-5xl'>&quot;МиниW3B&quot;</h1>
          <div className="text-center text-md text-stone-500 mt-5">Бесплатный элементарный конструктор сайтов без использования шаблонов.</div>
          <div className='text-center text-md text-stone-500'>Подходит для создания простого и быстрого или уникального авторского дизайна.</div>

        </motion.div>

        <div className="fixed bottom-0 border-t border-gray-100 left-0 flex h-auto w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="p-3"><Link href="/minisite/1">Пример сайта</Link></div>
        </div>

      </main>
    </>
  )
}
