"use client"

import { useContext, useState } from "react";
import { MinipanelContext } from "./minipanel";
import { parseProp } from "@/src/c/profile/minisites/client";
import useStore from "@/src/store/store"
import { Icon } from "@/src/c/ui/icon";
import { parse, stringify } from "transform-parser";
import { Colorpicker } from "../fields";

export function Minipanel__Size() {
  const layer: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_)

  if (!layer || !layer?.style) return null

  const style = layer.style
  const transform: any = parse(style.transform)

  const onChangeSize = (e: any) => {
    upd(layer.id, {
      ...layer,
      style: { ...layer.style, [e.target.name]: e.target.value + 'px' }
    })
  }

  const onChangeZ = (e: any) => {
    upd(layer.id, {
      ...layer, style: { ...layer.style, zIndex: e.target.value }
    })
  }

  const onChangeR = (e: any) => {
    const nt = parse(style.transform)
    nt.rotate = e.target.value + 'deg'
    upd(layer.id, {
      ...layer, style: {
        ...layer.style, transform: stringify(nt)
      }
    })
  }

  const onChangePosition = (e: any, i: number) => {
    const nt: any = parse(style.transform)
    nt.translate[i] = e.target.value + 'px'
    upd(layer.id, {
      ...layer, style: {
        ...layer.style, transform: stringify(nt)
      }
    })
  }

  return (
    <div className="grid grid-cols-6 text-xs">

      <label className="flex items-center w-full">
        <Icon tag="width" />
        <input
          onInput={onChangeSize}
          name="width"
          className="px-1 bg-white disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.width)} />
      </label>

      <label className="flex items-center w-full">
        <Icon tag="height" />
        <input
          onInput={onChangeSize}
          name="height"
          className="px-1 bg-white disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.height)} />
      </label>

      <label className="flex items-center w-full">
        <span>x</span>
        <input
          onInput={(e) => onChangePosition(e, 0)}
          name="left"
          className="px-1 bg-white disabled:opacity-50 w-full"
          type="number"
          value={transform?.translate ? transform.translate[0] : 0} />
      </label>

      <label className="flex items-center w-full">
        <span>y</span>
        <input
          onInput={(e) => onChangePosition(e, 1)}
          name="top"
          className="px-1 bg-white disabled:opacity-50 w-full"
          type="number"
          value={transform?.translate ? transform.translate[1] : 0} />
      </label>

      <label className="flex items-center w-full">
        <span>z</span>
        <input
          onInput={onChangeZ}
          className="px-1 bg-white disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.zIndex || '0')} />
      </label>

      <label className="flex items-center">
        <Icon tag="rotate_right" />
        <input
          onInput={onChangeR}
          className="px-1 bg-white disabled:opacity-50 w-full"
          type="number"
          max={360}
          value={transform?.rotate ? Math.floor(transform.rotate.replace('deg', '')) : 0} />
      </label>

    </div>
  )
}

export function Minipanel__Text(params: any) {
  const layer: any = useContext(MinipanelContext)
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
    <div className="text-xs">

      <div className="w-full grid grid-cols-4">
        <label className="flex items-center">
          <Icon tag={'format_size'} />
          <input
            onInput={onChangeProp}
            name="fontSize"
            className="px-1 bg-white disabled:opacity-50  w-full"
            type="number"
            value={parseProp(layer.style.fontSize)} />
        </label>

        <label className="flex items-center">
          <Icon tag={'format_letter_spacing'} />
          <input
            onInput={onChangeProp}
            name="letterSpacing"
            className="px-1 bg-white disabled:opacity-50  w-full"
            type="number"
            value={parseProp(layer.style.letterSpacing)} />
        </label>

        <label className="flex items-center">
          <Icon tag={'format_line_spacing'} />
          <input
            onInput={onChangeProp}
            name="lineHeight"
            className="px-1 bg-white disabled:opacity-50 w-full"
            type="number"
            step={0.1}
            value={layer.style.lineHeight} />
        </label>

        <div className="flex items-center">
          <Icon tag={'palette'} />
          <div className="ms-1 w-4 h-4 rounded-full overflow-hidden border border-stone-500">
            <Colorpicker styleProp="color" label={false} />
          </div>
        </div>

      </div>

      <div className="flex items-center justify-around">
        <label className="flex items-center mt-2">
          <select
            onInput={onChangeProp}
            data-unit={'0'}
            className="p-1 rounded bg-stone-100 w-full"
            value={layer.style.textAlign} name="textAlign">
            <option value="left">Слева</option>
            <option value="center">По центру</option>
            <option value="right">Справа</option>
          </select>
        </label>

        <label className="flex items-center mt-2">
          <select
            onInput={onChangeFont}
            name="fontFamily"
            className="p-1 rounded bg-stone-100 w-full"
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

    </div>
  )
}

export function Minipanel__Border(params: any) {
  const layer: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_)

  if (!layer) return null

  const onChange = (e: any) => {
    upd(layer.id, {
      ...layer, style: {
        ...layer.style,
        [e.target.name]: e.target.value + 'px'
      }
    })
  }

  return (
    <div className="grid grid-cols-5 text-xs">
      <div></div>

      <label className="flex items-center">
        <Icon tag={'horizontal_rule'} />
        <input
          onInput={onChange}
          name="borderWidth"
          className="px-1 disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.borderWidth)} />
      </label>

      <label className="flex items-center">
        <Icon className="rotate-45" tag={'arrow_forward_ios'} />
        <input
          onInput={onChange}
          name="borderRadius"
          className="px-1 disabled:opacity-50 w-full"
          type="number"
          value={parseProp(layer.style.borderRadius)} />
      </label>

      <div className="flex items-center">
        <Icon tag={'palette'} />
        <div className="ms-1 w-4 h-4 rounded-full overflow-hidden border border-stone-500">
          <Colorpicker styleProp="borderColor" label={false} />
        </div>
      </div>

      <div></div>

    </div>
  )
}

export function MiniPanel__Link(params: any) {
  const layer: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_)

  const onBlur = (e: any) => {
    upd(layer.id, {
      ...layer, link: {
        ...layer.link, href: e.target.value
      }
    })
  }

  return (
    <textarea
      onBlur={onBlur}
      className="w-full text-slate-700 p-2 scrollbar rounded text-xs"
      placeholder="Введите адрес ссылки"
      defaultValue={layer?.link?.href || ''}>
    </textarea>
  )
}

export function Minipanel__HTML(params: any) {
  const layer: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_)

  const onBlur = (e: any) => {
    upd(layer.id, {
      ...layer, innerHTML: e.target.value
    })
  }

  return (
    <textarea
      onBlur={onBlur}
      rows={10}
      className="w-full text-slate-700 p-2 scrollbar rounded text-sm"
      placeholder="Вставьте ваш код"
      defaultValue={layer?.innerHTML || ''}>
    </textarea>
  )
}

export function Minipanel__Effects(params: any) {
  const layer: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_)
  const [value, setValue] = useState(layer.style.opacity);

  const fixedCSS = (e: any) => {
    upd(layer.id, {
      ...layer, style: { ...layer.style, [e.target.name]: e.target.value }
    })
  }

  const change = (e: any) => {
    const ml = document.getElementById(layer.id)
    const val = Math.round(e.target.value * 10) / 10
    if (ml) {
      ml.style[e.target.name] = val.toString()
      setValue(val)
    }
  }

  return (
    <label className="flex items-center text-xs text-slate-700">
      <Icon tag={'opacity'} />
      <input
        onInput={change}
        onBlur={fixedCSS}
        name="opacity"
        className="px-1 disabled:opacity-50 w-full"
        type="number"
        step={0.1}
        max={1}
        value={value} />
    </label>
  )
}