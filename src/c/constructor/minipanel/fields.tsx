"use client"

import { useCallback, useContext } from "react";
import { MinipanelContext } from "./minipanel";
import { parseProp } from "@/src/c/profile/minisites/client";
import useStore from "@/src/store/store"
import { Icon } from "@/src/c/ui/icon";
import { Colorpicker } from "../fields";
import { Layer } from "../../models/layer";
import moment from "moment";
import { debounce } from "lodash";

export function Minipanel__Size() {
  const layerCtx: any = useContext(MinipanelContext);
  const upd = useStore((state: any) => state.updateLayer_);
  const layer = new Layer(layerCtx, upd);

  const fields = [
    {
      label: null,
      tag: 'width',
      name: 'width',
    },
    {
      label: null,
      tag: 'height',
      name: 'height',
    },
    {
      label: 'x',
      tag: null,
      name: 'translateX',
    },
    {
      label: 'y',
      tag: null,
      name: 'translateY',
    },
    {
      label: 'z',
      tag: null,
      name: 'zIndex',
    },
    {
      label: null,
      tag: 'rotate_right',
      name: 'rotate',
    },
  ]

  const onChange = (e: any) => {
    layer.setCSSProp(e);
  }

  if (!layer || !layer?.style) return null;

  return (
    <div className="grid grid-cols-6 text-xs">

      {
        fields.map((f, i) => {
          return (
            <label key={i} className="flex items-center w-full">
              {f.tag ? <Icon tag={f.tag} /> : <span>{f.label}</span>}
              <input
                onInput={onChange}
                name={f.name}
                className="px-1 bg-white disabled:opacity-50 w-full"
                type="number"
                defaultValue={layer.getProp(f.name)} />
            </label>
          )
        })
      }

    </div>
  )
}

export function Minipanel__Text(params: any) {
  const layerCtx: any = useContext(MinipanelContext);
  const upd = useStore((state: any) => state.updateLayer_);
  const layer = new Layer(layerCtx, upd);
  const fonts = useStore((state: any) => state.fonts)

  const onChangeProp = (e: any) => {
    layer.setCSSProp(e);
  }

  const changeFontFamily = (e: any) => {
    upd(layerCtx.id, {
      ...layerCtx,
      [e.target.name]: e.target.value
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
            defaultValue={layer.getProp('fontSize')} />
        </label>

        <label className="flex items-center">
          <Icon tag={'format_letter_spacing'} />
          <input
            onInput={onChangeProp}
            name="letterSpacing"
            className="px-1 bg-white disabled:opacity-50  w-full"
            type="number"
            defaultValue={layer.getProp('letterSpacing')} />
        </label>

        <label className="flex items-center">
          <Icon tag={'format_line_spacing'} />
          <input
            onInput={onChangeProp}
            name="lineHeight"
            className="px-1 bg-white disabled:opacity-50 w-full"
            type="number"
            step={0.1}
            defaultValue={layer.getProp('lineHeight')} />
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
            defaultValue={layer.getProp('textAlign')}
            name="textAlign">
            <option value="left">Слева</option>
            <option value="center">По центру</option>
            <option value="right">Справа</option>
          </select>
        </label>

        <label className="flex items-center mt-2">
          <select
            onInput={changeFontFamily}
            name="fontClass"
            className="p-1 rounded bg-stone-100 w-full"
            value={layerCtx.fontClass}>
            <option value={'Jost'}>По-умолчанию</option>
            {
              fonts?.google &&
              Object.values(fonts.google).map((font: any, ind: number) => {
                return font && <option key={ind} value={font.set.className}>{font.title}</option>
              })
            }
            {
              fonts?.local &&
              Object.values(fonts.local).map((font: any, ind: number) => {
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
  const layerCtx: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_);
  const layer = new Layer(layerCtx, upd);

  if (!layer) return null

  const onChange = (e: any) => {
    layer.setCSSProp(e);
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
          value={layer.getProp('borderWidth')} />
      </label>

      <label className="flex items-center">
        <Icon className="rotate-45" tag={'arrow_forward_ios'} />
        <input
          onInput={onChange}
          name="borderRadius"
          className="px-1 disabled:opacity-50 w-full"
          type="number"
          value={layer.getProp('borderRadius')} />
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
  const layerCtx: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_);
  const layer = new Layer(layerCtx, upd);

  const change = (e: any) => {
    layer.setCSSProp(e);
  }

  return (
    <label className="flex items-center text-xs text-slate-700">
      <Icon tag={'opacity'} />
      <input
        onInput={change}
        name="opacity"
        className="px-1 disabled:opacity-50 w-full"
        type="number"
        step={0.1}
        max={1}
        value={layer.getProp('opacity')} />
    </label>
  )
}

export function Minipanel__Modules_Timer() {
  const layerCtx: any = useContext(MinipanelContext)
  const upd = useStore((state: any) => state.updateLayer_);
  const layer = new Layer(layerCtx, upd);
  const timer = layer.timer;

  function change(e: any) {
    upd(layer.id, {
      ...layer,
      timer: {
        ...layer.timer,
        [e.target.name]: e.target.value
      }
    })
  }

  const changeParts = (e: any) => {
    upd(layer.id, {
      ...layer,
      timer: {
        ...layer.timer,
        parts: {
          ...layer.timer.parts,
          [e.target.name]: e.target.checked
        }
      }
    })
  }

  const options = [];
  for (let i = 0; i < 24; i++) {
    options.push(
      <option key={i} value={i}>{i}:00</option>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center">

        <label className="flex items-center text-xs text-slate-700 basis-5/12">
          <input
            onChange={change}
            name="date"
            className="px-1 disabled:opacity-50 w-full bg-stone-100"
            type="date"
            value={layer?.timer?.date ? moment(layer.timer.date).format('YYYY-MM-DD') : '0'} />
        </label>

        <label className="flex items-center text-xs text-slate-700 basis-5/12">
          <div className="mx-auto flex">
            <Icon className="text-lg" tag="schedule" />
            <select
              onChange={change}
              className="bg-stone-100"
              name="time"
              value={layer.timer.time}>
              {options}
            </select>
          </div>
        </label>

        <label className="flex items-center text-xs text-slate-700 basis-2/12">
          <Icon tag="numbers" />
          <input
            onChange={change}
            name="delimeter"
            className="px-1 disabled:opacity-50 w-full bg-stone-100 text-center"
            type="text"
            value={layer?.timer?.delimeter || ':'} />
        </label>

      </div>

      <div className="m-full text-xs mt-3 flex justify-between">
        <label className="flex items-center">
          <span className="me-1">Дни</span>
          <input
            onChange={changeParts}
            className="default-checkbox"
            type="checkbox"
            name="days"
            defaultChecked={timer.parts.days} />
        </label>
        <label className="flex items-center">
          <span className="me-1">Часы</span>
          <input
            onChange={changeParts}
            className="default-checkbox"
            type="checkbox"
            name="hours"
            defaultChecked={timer.parts.hours} />
        </label>
        <label className="flex items-center">
          <span className="me-1">Минуты</span>
          <input
            onChange={changeParts}
            className="default-checkbox"
            type="checkbox"
            name="minutes"
            defaultChecked={timer.parts.minutes} />
        </label>
        <label className="flex items-center">
          <span className="me-1">Секунды</span>
          <input
            onChange={changeParts}
            className="default-checkbox"
            type="checkbox"
            name="seconds"
            defaultChecked={timer.parts.seconds} />
        </label>
        <label className="flex items-center">
          <span className="me-1">Подписи</span>
          <input
            onChange={changeParts}
            className="default-checkbox"
            type="checkbox"
            name="text"
            defaultChecked={timer.parts.text} />
        </label>
      </div>

      <label className="block items-center text-xs text-slate-700 w-full mt-3">
        <div className="text-gray-500">
          Текст по истечении таймера.
          <span className="float-right">max: 100</span>
        </div>
        <div className="flex">
          <input
            onBlur={change}
            name="endText"
            maxLength={100}
            placeholder="Введите текст"
            className="p-1 disabled:opacity-50 w-full bg-stone-100"
            type="text"
            defaultValue={layer?.timer?.endText || 'Уже идёт!'} />
          <button className="text-xl flex bg-sky-300 text-slate-700 w-8">
            <Icon className="m-auto" tag="send" />
          </button>
        </div>
      </label>

    </div>
  )
}