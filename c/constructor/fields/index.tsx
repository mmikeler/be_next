"use client"

import { useStore } from "@/store/store"
import { useState } from "react"


export function Colorpicker({ styleProp, label }: {
  styleProp: string, label: string | false
}) {
  const activeLayerID = useStore((state: any) => state.activeLayer)
  const layer = useStore((state: any) => state.layers[activeLayerID])
  const action = useStore((state: any) => state.updateLayer)
  const target = document.getElementById(layer.id)
  const [value, setValue] = useState(layer.style.backgroundColor);


  const onBlur = (e: any) => {
    action({
      ...layer, style: {
        ...layer.style, [e.target.name]: value
      }
    })
  }

  const onChange = (e: any) => {
    target && (target.style[e.target.name] = e.target.value)
    setValue(e.target.value)
  }

  return (
    <>
      {label ? <div className="mb-1">{label}</div> : null}
      <label className="w-full h-5 block rounded relative" htmlFor={styleProp} style={{
        backgroundColor: value
      }}>
        <input
          id={styleProp}
          name={styleProp}
          onBlur={onBlur}
          onChange={onChange}
          className="w-full opacity-0"
          type="color"
          value={value} />
      </label>
    </>
  )
}

export function Link_(params: any) {
  const activeLayerID = useStore((state: any) => state.activeLayer)
  const layer = useStore((state: any) => state.layers[activeLayerID])
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