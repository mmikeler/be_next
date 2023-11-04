"use client"

import useStore from "@/store/store"
import { parse, stringify } from 'transform-parser';
import { LayerContext } from "../panel/panel";
import { useContext } from "react";

export function Position(params: any) {
  const layer: any = useContext(LayerContext)
  const action = useStore((state: any) => state.updateLayer)

  if (!layer) return null

  const style = layer.style
  const transform: any = parse(style.transform)

  const onChangeZ = (e: any) => {
    action({
      ...layer, style: { ...layer.style, zIndex: e.target.value }
    })
  }

  const onChangeR = (e: any) => {
    const nt = parse(style.transform)
    nt.rotate = e.target.value + 'deg'
    action({
      ...layer, style: {
        ...layer.style, transform: stringify(nt)
      }
    })
  }

  const onChangePosition = (e: any, i: number) => {
    const nt: any = parse(style.transform)
    nt.translate[i] = e.target.value + 'px'
    action({
      ...layer, style: {
        ...layer.style, transform: stringify(nt)
      }
    })
  }

  return (
    <div className="flex justify-between mt-2">

      <label className="flex items-center">
        <span className="">X</span>
        <input
          onChange={(e) => onChangePosition(e, 0)}
          name="left"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={transform?.translate ? transform.translate[0] : 0} />
      </label>

      <label className="flex items-center">
        <span className="">Y</span>
        <input
          onChange={(e) => onChangePosition(e, 1)}
          name="top"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={transform?.translate ? transform.translate[1] : 0} />
      </label>

      <label className="flex items-center">
        <span className="">Z</span>
        <input
          onChange={onChangeZ}
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          value={layer.style.zIndex} />
      </label>

      <label className="flex items-center">
        <span className="">R</span>
        <input
          onChange={onChangeR}
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          max={360}
          value={transform?.rotate ? Math.floor(transform.rotate.replace('deg', '')) : 0} />
      </label>

    </div>
  )
}