"use client"

import { useContext, useState } from "react"
import Link from 'next/link'
import { DDate } from "@/c/ui/date"
import axios from "axios"
import { Icon } from "@/c/ui/icon"
import { UserCtx } from "../profile"

export function Site_Table_Element(params: any) {
  const { id, slug, title, created, expired, published } = params.data

  return (
    <div className="mt-4 p-3 bg-stone-100 rounded border border-slate-300">

      <div className="text-slate-700 w-full flex">
        <div className="text-slate-500 text-xs me-3 mt-1">#{id}</div>
        <div>
          <div className="flex flex-col text-md">
            <span className="flex items-center text-lg">
              <Link className="text-sky-500" target="_blank" href={'/m/' + slug}>
                {title}
              </Link>
            </span>
            <span className="flex items-center">
              <Link
                className="text-sky-700 text-sm"
                target="_blank"
                href={'/m/' + slug}>https://miniw3b.ru/m/{slug}</Link>
            </span>
          </div>

          <div className="text-sm text-xs text-stone-500 mt-3">
            <Icon className="me-2" tag={"calendar_add_on"} />
            <DDate date={created} />
            <div className="mx-3"></div>
            <Icon className="me-2" tag={"event_busy"} />
            {expired ? <DDate date={expired} /> : '-'}
          </div>
        </div>
      </div>

      <Toggler data={params.data} />

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