"use client"

import Topbar from '@/c/topbar'
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <Topbar />

        <motion.div
          initial={{ opacity: 0, top: 30 }}
          animate={{ opacity: 1, top: 0 }}
          className='m-auto p-3 relative'>
          <h1 className='text-center text-5xl'>&quot;Be Next&quot;</h1>
          <div className="text-center text-md text-stone-500">Шаблон приложения полного цикла</div>
          <p className='text-center mt-5 text-sm'>Включает в себя регистрацию, авторизацию и CRUD базы данных.</p>
          <table className='mt-10 w-full text-center'>
            <tbody>
              <tr>
                <td className='w-1/2'>NEXT.js</td>
                <td>Основной фреймворк</td>
              </tr>
              <tr>
                <td className='w-1/2'>NEXT Auth</td>
                <td>Авторизация / Регистрация</td>
              </tr>
              <tr>
                <td className='w-1/2'>Prisma</td>
                <td>Менеджер БД</td>
              </tr>
              <tr>
                <td className='w-1/2'>SQLight</td>
                <td>База данных</td>
              </tr>
              <tr>
                <td className='w-1/2'>Zustand</td>
                <td>Управление состоянием</td>
              </tr>
              <tr>
                <td className='w-1/2'>Tailwind</td>
                <td>Стилизация</td>
              </tr>
              <tr>
                <td className='w-1/2'>Axios</td>
                <td>Межсайтовые запросы</td>
              </tr>
              <tr>
                <td className='w-1/2'>FramerMotion</td>
                <td>Анимация компонентов</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <div className="fixed bottom-0 border-t border-gray-100 left-0 flex h-auto w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="p-3">Bottombar</div>
          <div className="p-3"><a href={'/page'}>Pages</a></div>
        </div>

      </main>
    </>
  )
}
