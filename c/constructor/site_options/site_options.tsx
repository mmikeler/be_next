"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { Icon } from "@/c/ui/icon";
import axios from "axios";
import { sanitizeHTML } from "@/c/profile/minisites/client";
import { General__Style } from "./general_style";

export function General_Site_Options(params: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className={`m-1 text-2xl flex ${open && 'text-lime-500'} hover:text-lime-500 transition-all cursor-pointer`}>
        <Icon tag={'page_info'} />
      </div>

      {open &&
        <motion.div
          animate={{ right: 0 }}
          style={{ zIndex: '9999', width: '340px' }}
          className="scroll-bar fixed top-8 -right-60 h-screen bg-stone-700 p-5 pb-20 overflow-y-auto scrollbar">
          <div className="uppercase mb-5">Настройки сайта</div>

          <General__Head />
          <General__Style />

        </motion.div>
      }
    </>
  )
}

export function General__Widget(params: any) {
  return (
    <div className="mb-3 text-sm">
      <div className="mb-3 border-b">
        <div className="relative px-2 -bottom-3 bg-stone-700 w-fit mx-auto">{params.title}</div>
      </div>
      {params.children}
    </div>
  )
}

function General__Head(params: any) {
  const siteID = useStore((state: any) => state.siteid);
  const [title, setTitle] = useState(document.title);
  const [slug, setSlug] = useState(window.location.href.split('/').pop());

  const changeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const fixedTitle = (e: any) => {
    try {
      // Сохраняем в БД
      axios.patch('/api/minisites', {
        id: Number(siteID),
        options: {
          title: sanitizeHTML(title || '')
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const fixedSlug = async (e: any) => {
    try {
      // Сохраняем в БД
      axios.patch('/api/minisites', {
        id: Number(siteID),
        options: {
          slug: sanitizeHTML(slug || '')
        }
      })
        .then(res => {
          if (res.data.error) {
            alert(res.data.errorMessage)
          }
          else {
            window.location.href = '/m/' + res.data.result.slug
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <General__Widget title="Head">

      <label className="text-sm w-full block">
        <div>Title</div>
        <input
          onChange={changeTitle}
          onBlur={fixedTitle}
          className="p-1 text-slate-700 w-full"
          type="text"
          name="title"
          defaultValue={title} />
        <div className="text-xs text-stone-300 pt-1">
          Отображается на вкладке браузера
        </div>
      </label>

      <label className="text-sm w-full mt-3 block">
        <div>Slug</div>
        <input
          onChange={(e: any) => setSlug(e.target.value)}
          onBlur={fixedSlug}
          className="p-1 text-slate-700 w-full"
          type="text"
          name="slug"
          defaultValue={slug} />
        <div className="text-xs text-stone-300 pt-1">
          Адрес ссылки на этот сайт
        </div>
      </label>

    </General__Widget>
  )
}