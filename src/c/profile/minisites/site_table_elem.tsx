"use client"

import { useContext, useState } from "react"
import Link from 'next/link'
import { DDate } from "@/src/c/ui/date"
import axios from "axios"
import { Icon } from "@/src/c/ui/icon"
import { UserCtx } from "../profile"
import { motion } from "framer-motion"
import prisma from "@/src/db/prisma"
import { random } from "lodash"
import { Delayer } from "../../ui/delay_animate"

export function Site_Table_Element(params: any) {
  const { id, slug, title, created, expired, published } = params.data

  return (
    <div className="relative mt-4 text-slate-700 bg-stone-100 rounded border border-slate-300">

      <div className="text-sm border-b flex items-center">
        <div className="px-2">#{id}</div>
        <div className="flex flex-col text-md px-2">
          <span className="flex items-center">
            <Link className="text-sky-500" target="_blank" href={'/m/' + slug}>
              {title}
            </Link>
          </span>
        </div>
        <div className="ml-auto h-9">
          <DynamicOptions data={params.data} />
        </div>
      </div>

      <div className="p-2 text-sm text-xs bg-white">

        <div className="flex items-center mt-2">
          <Icon className="me-2 text-lg" tag={"link"} />
          <span>Адрес</span>
          <Link
            className="text-sky-700 ms-auto"
            target="_blank"
            href={'/m/' + slug}>/{slug}</Link>
        </div>

        <div className="flex items-center mt-2">
          <Icon className="me-2 text-lg" tag={"calendar_add_on"} />
          <span>Создан</span>
          <div className="ms-auto">
            <DDate date={created} />
          </div>
        </div>

        <div className="flex items-center mt-2">
          <Icon className="me-2 text-lg" tag={"event_busy"} />
          <span>Закроется</span>
          <div className="ms-auto">
            {expired ? <DDate date={expired} /> : <Icon className="text-lg" tag={"all_inclusive"} />}
          </div>
        </div>

      </div>

      <div className="border-t p-2">
        <Toggler data={params.data} />
      </div>

    </div>
  )
}

function Toggler(props: any) {
  const { id, slug, published } = props.data
  const [open, setPublic] = useState(published)
  const user: any = useContext(UserCtx)

  const toggle = async () => {
    await axios.patch('/api/minisites', { id: id, options: { published: !open } })
      .then(res => {
        if (res?.data) {
          setPublic(res.data.result.published)
        }
      })
  }

  if (user?.points < 5) {
    return (
      <div className="flex items-end w-fit ms-auto text-xs">
        Блок. <Icon className="text-4xl text-red-500" tag="lock" />
      </div>
    )
  }

  return (
    <div className="flex items-center w-fit ms-auto text-xs">
      <span>{open ? 'Вкл.' : 'Выкл.'}</span>
      <input
        id={slug}
        className="checkbox"
        onChange={toggle}
        type="checkbox"
        defaultChecked={open} />
      <label htmlFor={slug} className="checkbox-label ms-3"></label>
    </div>
  )
}

function DynamicOptions(props: any) {
  const { masterId, title, slug, content } = props.data
  const [open, setOpen] = useState(false);
  const [delay, setDelay] = useState(false);

  const copy = async () => {
    setDelay(true);

    try {
      const result = await axios.put('/api/minisites', {
        masterId: masterId,
        authorId: masterId,
        title: title,
        slug: slug,
        content: content
      })

      if (result.data.result?.id) {
        window.location.reload()
      }
      else {
        alert('Операция не удалась.')
      }
    } catch (error) {
      alert('Операция не удалась.')
    }

    setDelay(false);
  }

  if (delay) {
    return (
      <div className="cursor-pointer text-4xl text-sky-500">
        <Delayer />
      </div>
    )
  }

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="text-4xl cursor-pointer">
        <Icon tag="more_vert" />
      </div>
      {open ?
        <motion.div
          className="absolute rounded right-[35px] w-[140px] top-0 bg-slate-700 text-white text-xs overflow-hidden">

          <div
            onClick={copy}
            className="p-2 flex items-center border-b border-slate-500 cursor-pointer">
            <Icon className="text-lg me-1" tag="content_copy" />
            <span>Скопировать сайт</span>
          </div>

          <div className="p-2 flex items-center border-b border-slate-500 opacity-30">
            <Icon className="text-lg me-1" tag="layers_clear" />
            <span>Сбросить контент</span>
          </div>

        </motion.div>
        : null}
    </>
  )
}