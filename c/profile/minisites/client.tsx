"use client"

import { Icon } from "@/c/ui/icon"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import Link from 'next/link'
import { DDate } from "@/c/ui/date"
import { useStore } from "@/store/store"
import { MS_Image } from "@/c/ui/ms_image"

export default function Add_Site_Button() {
  const { data: session } = useSession()

  const addSite = () => {
    if (session && session.user)
      axios.post('/api/minisites', { id: session.user.email })
    else
      alert('Ошибка')
  }

  return (
    <div onClick={addSite} className="pe-4 ps-2 py-2 uppercase text-slate-500 flex items-center bg-stone-100 text-xs rounded hover:bg-stone-300 cursor-pointer ms-auto">
      <span className="text-xl h-6 w-6"><Icon tag={'add'} /></span>
      Добавить сайт
    </div>
  )
}

export function Site_Table_Element(params: any) {
  const { id, title, created, expired, published } = params.data
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
    <div className="mt-4 p-3 bg-stone-100 rounded border border-slate-300 flex items-start">
      <span className="text-slate-500 text-xs mt-1">#{id}</span>
      <span className="text-slate-700 ms-4">
        <div className="text-sky-500 flex item-center text-lg mb-5">
          <Link target="_blank" href={'/minisite/' + id}>{title}</Link>
          <Icon className="ms-2" tag={"arrow_outward"} />
        </div>
        <div className="text-sm flex items-center">
          <Icon className="me-2" tag={"calendar_add_on"} />
          <DDate date={created} />
          <div className="mx-3"></div>
          <Icon className="me-2" tag={"event_busy"} />
          {expired ? <DDate date={expired} /> : '-'}
        </div>
      </span>
      <div onClick={toggle} className={`ms-auto float-right rounded ${open ? 'bg-lime-300' : 'bg-stone-300'} px-3 py-1 text-xs`}>
        {open ? 'Доступен' : 'Закрыт'}
      </div>
    </div>
  )
}

export function parseProp(str: String) {
  const numberPattern = /\d+/g;
  const match = str?.match(numberPattern)
  return Number(match && match[0]) || 0
}

export function LayerComponent(props: any) {
  const layer = props.data
  const author: string = props.author
  const activeLayers = useStore((state: any) => state.activeLayers)
  const isLayerActive = activeLayers.includes(layer.id) ? true : false
  const action = useStore((state: any) => state.updateLayer)
  const [edit, setEdit] = useState(false);

  const focus = (e: any) => {
    e.target.focus
    setEdit(true)
  }

  const saveChange = (e: any) => {
    setEdit(false)
    action({
      ...layer,
      innerText: sanitizeHTML(e.target.innerHTML)
    })
  }

  return (
    <>
      <Wrapper layer={layer} edit={props.edit} isLayerActive={isLayerActive}>
        {layer.layerType === 'text' &&
          <div
            onDoubleClick={focus}
            className={`h-full ${layer.fontClass || ''}`}
            onBlur={saveChange}
            contentEditable={isLayerActive && edit ? true : false}
            dangerouslySetInnerHTML={{ __html: layer.innerText }}>
          </div>
        }

        {layer.layerType === 'code' &&
          <div className={`h-full ${props.edit ? `relative overlay` : ''}`}
            dangerouslySetInnerHTML={{ __html: layer.innerHTML }}>
          </div>
        }

        {layer.layerType === 'image' &&
          <MS_Image path={layer.src} author={author} />
        }
      </Wrapper>
    </>
  )
}

function Wrapper(params: any) {
  const { layer, edit, isLayerActive } = params

  if (layer.link?.href.length > 0 && !params.edit) {
    return (
      <Link
        id={layer.id}
        style={layer.style}
        target="_blank"
        className={`cursor-pointer${isLayerActive ? ' lm' : ''}`}
        href={layer.link.href || ''}>
        {params.children}
      </Link>
    )
  }
  else {
    return (
      <div
        id={layer.id}
        style={layer.style}
        className={isLayerActive ? ' lm cursor-move' : ''}
      >
        {params.children}
      </div>
    )
  }
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
function sanitizeHTML(s: string) {
  var div = document.createElement("div");
  div.innerHTML = s;
  sanitize(div);
  return div.innerHTML;
}