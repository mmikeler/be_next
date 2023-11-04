"use client"

import { Icon } from "@/c/ui/icon"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Link from 'next/link'
import { DDate } from "@/c/ui/date"

export default function Add_Site_Button() {
  const { data: session } = useSession()

  const addSite = () => {
    if (session && session.user)
      axios.post('/api/minisites', { id: session.user.email })
    else
      alert('Ошибка')
  }

  return (
    <div
      onClick={addSite}
      className="pe-4 ps-2 py-2 uppercase text-stone-100 flex items-center bg-green-600 text-xs rounded hover:bg-green-700 cursor-pointer ms-auto transition-all">
      <Icon className="text-xl h-6 w-6" tag={'add'} />
      Добавить сайт
    </div>
  )
}

export function Site_Table_Element(params: any) {
  const { id, slug, title, created, expired, published } = params.data
  const [open, setPublic] = useState(published)

  const toggle = async () => {
    await axios.patch('/api/minisites', { id: id, options: { published: !open } })
      .then(res => {
        if (res?.data) {
          setPublic(res.data.result.published)
        }
      })
  }

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

    </div>
  )
}

export function parseProp(str: String) {
  const numberPattern = /\d+/g;
  const match = str?.match(numberPattern)
  return Number(match && match[0]) || 0
}

/*
============== FONTS
*/
export function getBaseFontUrl(params: any) {
  const { title, wght } = params.font
  return `https://fonts.googleapis.com/css2?family=${title}:wght@${wght}&display=swap`
}

export function BaseFontLink(params: any) {
  return `<link href="${getBaseFontUrl(params.font)}" rel="stylesheet">`
}

/**
 * UTIL
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function sanitize(el: any) {

  var ALLOWED_TAGS = ["STRONG", "EM", "B"]; // !!!

  var tags = Array.prototype.slice.apply(el.getElementsByTagName("*"), [0]);
  for (var i = 0; i < tags.length; i++) {
    console.log(tags[i].nodeName);

    if (ALLOWED_TAGS.indexOf(tags[i].nodeName) == -1) {
      usurp(tags[i]);
    }
  }
}
function usurp(p: any) {
  var last = p;
  for (var i = p.childNodes.length - 1; i >= 0; i--) {
    var e = p.removeChild(p.childNodes[i]);
    p.parentNode.insertBefore(e, last);
    last = e;
  }
  p.parentNode.removeChild(p);
}
export function sanitizeHTML(s: string) {
  var div = document.createElement("div");
  div.innerHTML = s;
  sanitize(div);
  return div.innerHTML;
}