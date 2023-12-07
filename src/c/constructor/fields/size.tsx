"use client"

import { parseProp } from "@/src/c/profile/minisites/client"
import useStore from "@/src/store/store"
import { useContext } from "react"
import { LayerContext } from "../panel/panel"

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