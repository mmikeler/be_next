"use client"

import { Jost } from 'next/font/google'
import bg from '../../public/assets/bg.png';
import { createContext } from 'react';
import { motion } from 'framer-motion';
import { Icon } from './ui/icon';
import { useCurrentUser } from '../hooks/current_user';

const font = Jost({ subsets: ['cyrillic', 'latin'], weight: ['400'] })

export const AppContext = createContext(null);

export default function App(props: any) {
  const user = useCurrentUser();

  return (
    <html lang="ru">
      <body
        style={{ background: `url(${bg.src}) repeat` }}
        className={font.className}>
        <AppContext.Provider value={props.siteOptions}>
          {props.siteOptions?.maintenance === '1' && user?.role !== 'Superadmin' ? // Сайт закрыт на обслуживание. 1 - да.

            <Maintenance_Message />

            : props.children
          }
        </AppContext.Provider>
      </body>
    </html >
  )
}

function Maintenance_Message() {
  return (
    <div className="w-[360px] bg-stone-100 border m-auto h-[100dvh] text-lg flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full flex h-[200px] overflow-hidden">
        <motion.div
          className='absolute left-0 top-8'
          animate={{
            scale: 1,
            rotate: [0, 90, 180, 270, 250, 270, 360],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0
          }}>
          <Icon className="text-gray-500 text-[130px] filled" tag="settings" />
        </motion.div>
        <motion.div
          className='mx-auto relative z-20'
          animate={{
            scale: 1,
            rotate: [360, 270, 250, 270, 180, 90, 0],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0
          }}>
          <Icon className="text-gray-300 text-[200px] filled" tag="settings" />
        </motion.div>
        <motion.div
          className='absolute right-0 top-8'
          animate={{
            scale: 1,
            rotate: [0, 90, 180, 270, 250, 270, 360],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0
          }}>
          <Icon className="text-gray-500 text-[130px] filled" tag="settings" />
        </motion.div>
      </div>

      <div className="flex text-center">
        <span>
          Сайт закрыт на обслуживание. <br />
          Попробуйте зайти позднее.
        </span>
      </div>
    </div>
  )
}