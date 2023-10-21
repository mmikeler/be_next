"use client"

import { parseProp } from "@/c/profile/minisites/client"
import { Icon } from "@/c/ui/icon"
import { useStore } from "@/store/store"
import { Colorpicker } from "."

export function Border(params: any) {
  const activeLayerID = useStore((state: any) => state.activeLayers[0])
  const layer = useStore((state: any) => state.layers[activeLayerID])
  const action = useStore((state: any) => state.updateLayer)

  const onChange = (e: any) => {
    action({
      ...layer, style: {
        ...layer.style,
        [e.target.name]: e.target.value + 'px'
      }
    })
  }

  return (
    <div className="flex justify-between">

      <label className="flex items-center w-1/3">
        <span className="me-1"><Icon tag={'horizontal_rule'} /></span>
        <input
          onChange={onChange}
          name="borderWidth"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.borderWidth)} />
      </label>

      <label className="flex items-center w-1/3">
        <span className="me-1 rotate-45"><Icon tag={'arrow_forward_ios'} /></span>
        <input
          onChange={onChange}
          name="borderRadius"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.borderRadius)} />
      </label>

      <div className="flex items-center w-1/3">
        <Colorpicker styleProp="borderColor" label={false} />
      </div>

    </div>
  )
}