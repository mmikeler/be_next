"use client"

import { parseProp } from "@/c/profile/minisites/client"
import { Icon } from "@/c/ui/icon"
import { useStore } from "@/store/store"
import { Colorpicker } from "."

export function FontField(params: any) {
  const activeLayerID = useStore((state: any) => state.activeLayers[0])
  const layer = useStore((state: any) => state.layers[activeLayerID])
  const action = useStore((state: any) => state.updateLayer)
  const fonts = useStore((state: any) => state.fonts)

  const onChangeProp = (e: any) => {
    action({
      ...layer,
      style: {
        ...layer.style,
        [e.target.name]: e.target.value + (
          e.target.name.match('lineHeight') || e.target.dataset.unit === '0' ? '' : 'px')
      }
    })
  }

  const onChangeFont = (e: any) => {
    console.log(e.target.dataset)
    action({
      ...layer,
      fontClass: e.target.value
    })
  }

  return (
    <div className="flex flex-wrap mt-2">

      <label className="flex items-center w-1/3">
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

      <label className="flex items-center  w-1/3">
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

      <label className="flex items-center  w-1/3">
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

      <div className="flex items-center w-1/2 mt-2">
        <Colorpicker styleProp="color" label={false} />
      </div>

      <div className="text-slate-700 w-1/2 mt-2 flex items-center justify-center">
        <select
          onChange={onChangeProp}
          data-unit={'0'}
          className="p-1 rounded bg-stone-100"
          value={layer.style.textAlign} name="textAlign">
          <option value="left">Слева</option>
          <option value="center">По центру</option>
          <option value="right">Справа</option>
        </select>
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