"use client"

import useStore from "@/store/store"
import { useContext, useEffect, useState } from "react"
import { LayerContext } from "../panel/panel"
import { MinipanelContext } from "../minipanel/minipanel"
import { parseProp } from "@/c/profile/minisites/client"

export function Size(params: any) {
  const layer: any = useContext(LayerContext)
  const action = useStore((state: any) => state.updateLayer)

  if (!layer) return null

  const onChangeSize = (e: any) => {
    action({
      ...layer,
      style: { ...layer.style, [e.target.name]: e.target.value + 'px' }
    })
  }

  return (
    <div className="flex mt-2">

      <label className="flex items-center w-full">
        <span className="me-1">Ш</span>
        <input
          onChange={onChangeSize}
          name="width"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.width)} />
      </label>

      <div className="w-1/5"></div>

      <label className="flex items-center w-full">
        <span className="me-1">В</span>
        <input
          onChange={onChangeSize}
          name="height"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.height)} />
      </label>

    </div>
  )
}

export function Colorpicker(props: any) {
  const styleProp = props.styleProp
  const label = props.label
  const layer: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_)
  const [value, setValue] = useState(layer?.style[styleProp]);
  const target = document.getElementById(layer?.id)

  const onBlur = (e: any) => {
    upd(layer.id, {
      ...layer, style: {
        ...layer.style, [e.target.name]: value
      }
    })
  }

  const onChange = (e: any) => {
    target && (target.style[e.target.name] = e.target.value)
    setValue(e.target.value)
  }

  useEffect(() => {
    setValue(layer?.style[styleProp] || '#ffffff')
  }, [layer, styleProp])

  if (!layer) return null

  return (
    <>
      {label ? <div className="mb-1">{label}</div> : null}
      <label className="block h-4 w-4 cursor-pointer" htmlFor={styleProp} style={{
        backgroundColor: value
      }}>
        <input
          id={styleProp}
          name={styleProp}
          onBlur={onBlur}
          onChange={onChange}
          className="absolute -z-10 w-full opacity-0"
          type="color"
          value={value} />
      </label>
    </>
  )
}

export function Link_(params: any) {
  const layer: any = useContext(LayerContext)
  const action = useStore((state: any) => state.updateLayer)

  const onBlur = (e: any) => {
    action({
      ...layer, link: {
        ...layer.link, href: e.target.value
      }
    })
  }

  return (
    <textarea
      onBlur={onBlur}
      className="w-full text-slate-700 p-2 scrollbar rounded"
      defaultValue={layer?.link?.href || ''}>
    </textarea>
  )
}

export function HTML_(params: any) {
  const layer: any = useContext(LayerContext)
  const action = useStore((state: any) => state.updateLayer)

  const onBlur = (e: any) => {
    action({
      ...layer, innerHTML: e.target.value
    })
  }

  return (
    <textarea
      onBlur={onBlur}
      rows={20}
      className="w-full text-slate-700 p-2 scrollbar rounded"
      defaultValue={layer?.innerHTML || ''}>
    </textarea>
  )
}