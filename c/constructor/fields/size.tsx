"use client"

import { parseProp } from "@/c/profile/minisites/client"
import { useStore } from "@/store/store"

export function Size(params: any) {
  const activeLayerID = useStore((state: any) => state.activeLayer)
  const layer = useStore((state: any) => state.layers[activeLayerID])
  const layerStyle = useStore((state: any) => state.layers[activeLayerID].style)
  const action = useStore((state: any) => state.updateLayer)

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