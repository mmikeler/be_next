"use client"

import { parseProp } from "@/c/profile/minisites/client"
import { Icon } from "@/c/ui/icon"
import { useStore } from "@/store/store"
import { Font } from "../font_lib"
import { Colorpicker } from "."

export function FontField(params: any) {
  const activeLayerID = useStore((state: any) => state.activeLayer)
  const layer = useStore((state: any) => state.layers[activeLayerID])
  const action = useStore((state: any) => state.updateLayer)
  const fonts = useStore((state: any) => state.fonts)

  const onChangeProp = (e: any) => {
    action({
      ...layer,
      style: {
        ...layer.style,
        [e.target.name]: e.target.value + (
          e.target.name.match('lineHeight') ? '' : 'px')
      }
    })
  }

  const onChangeFont = (e: any) => {
    action({
      ...layer,
      fontClass: e.target.value
    })
  }

  return (
    <div className="flex flex-wrap mt-2">

      <label className="flex items-center w-1/2">
        <span className="me-1 text-lg">
          <Icon tag={'format_size'} />
        </span>
        <input
          onChange={onChangeProp}
          name="fontSize"
          className="px-1 bg-slate-700 disabled:opacity-50  w-full"
          type="number"
          value={parseProp(layer.style.fontSize)} />
      </label>

      <label className="flex items-center  w-1/2">
        <span className="me-1 text-lg">
          <Icon tag={'format_letter_spacing'} />
        </span>
        <input
          onChange={onChangeProp}
          name="letterSpacing"
          className="px-1 bg-slate-700 disabled:opacity-50  w-full"
          type="number"
          value={parseProp(layer.style.letterSpacing)} />
      </label>

      <label className="flex items-center  w-1/2">
        <span className="me-1 text-lg">
          <Icon tag={'format_line_spacing'} />
        </span>
        <input
          onChange={onChangeProp}
          name="lineHeight"
          className="px-1 bg-slate-700 disabled:opacity-50 w-full"
          type="number"
          step={0.1}
          value={layer.style.lineHeight} />
      </label>

      <div className="flex items-center w-1/2">
        <Colorpicker styleProp="color" label={false} />
      </div>

      <label className="flex items-center w-full mt-2">
        <select
          onChange={onChangeFont}
          name="fontFamily"
          className="px-1 bg-stone-100 text-slate-700 p-1 disabled:opacity-50 w-full"
          value={layer.fontClass}>
          <option value={'Jost'}>По-умолчанию</option>
          {
            Object.values(fonts).map((font: any, ind: number) => {
              return font && <option key={ind} value={font.set.className}>{font.title}</option>
            })
          }
        </select>
      </label>

    </div>
  )
}