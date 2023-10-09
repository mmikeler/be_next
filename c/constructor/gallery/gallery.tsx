"use client"

import { Icon } from "@/c/ui/icon";
import { useState } from "react";
import { motion } from "framer-motion"
import { Disk } from "./disk";
import { Type_Icon } from "../icons";


export function Gallery() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className={`m-1 text-2xl flex ${open && 'text-lime-500'} hover:text-lime-500 transition-all cursor-pointer`}>
        <Type_Icon type="image" />
      </div>

      {open &&
        <motion.div
          animate={{ right: 0 }}
          className="scrollbar fixed top-8 -right-60 w-80 max-w-full z-10 bg-stone-700 p-5 overflow-auto" style={{ height: 'calc(100vh - 32px)' }}>
          <div className="uppercase text-lg">Библиотека изображений</div>
          <p className="text-xs mb-8">Выберите изображение, которое хотите добавить на сайт</p>

          <Disk closeAction={setOpen} />

        </motion.div>
      }
    </>
  )
}