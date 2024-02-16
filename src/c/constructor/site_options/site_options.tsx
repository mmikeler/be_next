"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { Icon } from "@/src/c/ui/icon";
import { General__Style } from "./site_options/general_style";
import General__Head from "./site_options/general_head";
import General__Meta from "./site_options/general_meta";
import useStore from "@/src/store/store";
import { Delayer } from "../../ui/delay_animate";

export function General_Site_Options(params: any) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('head');
  const [delay, setDelay] = useState(false);
  const mod = 'border text-center text-xs uppercase p-1 cursor-pointer hover:bg-amber-700 transition-all';

  const fakeSave = () => {
    setDelay(true);
    const t = setTimeout(() => {
      setDelay(false);
      clearTimeout(t);
    }, 1000);
  }

  return (
    <>
      <div onClick={() => setOpen(!open)} className={`m-1 text-2xl flex ${open && 'text-lime-500'} hover:text-lime-500 transition-all cursor-pointer`}>
        <Icon tag={'page_info'} />
      </div>

      {open &&
        <motion.div
          animate={{ right: 0 }}
          style={{ zIndex: '9999', width: '340px' }}
          className="scroll-bar fixed flex flex-col top-8 -right-60 h-screen bg-stone-700 p-5 pb-20 overflow-y-auto scrollbar">
          <div className="uppercase mb-5">Настройки сайта</div>

          <div className="grid grid-cols-3 gap-1">
            <div
              onClick={() => setTab('head')}
              className={`${mod} ${tab === 'head' ? 'bg-amber-700' : 'bg-slate-700'}`}>
              Head
            </div>
            <div
              onClick={() => setTab('style')}
              className={`${mod} ${tab === 'style' ? 'bg-amber-700' : 'bg-slate-700'}`}>
              Style
            </div>
            <div
              onClick={() => setTab('meta')}
              className={`${mod} ${tab === 'meta' ? 'bg-amber-700' : 'bg-slate-700'}`}>
              Meta
            </div>
          </div>

          {tab === 'head' ? <General__Head /> : null}
          {tab === 'style' ? <General__Style /> : null}
          {tab === 'meta' ? <General__Meta /> : null}

          <div
            onClick={fakeSave}
            className="mt-auto border text-sm text-center p-2 rounded cursor-pointer hover:bg-stone-800">
            {delay ? <Delayer /> : 'Сохранить'}
          </div>

        </motion.div>
      }
    </>
  )
}

export function General__Widget(params: any) {
  return (
    <div className="mb-3 text-sm">
      <div className="mb-3 border-b">
        <div className="relative px-2 -bottom-3 bg-stone-700 w-fit mx-auto">
          {params.title}
        </div>
      </div>
      {params.children}
    </div>
  )
}

export function General__Textarea({
  propName,
  min,
  max,
  note
}: {
  propName: string,
  min: number,
  max: number,
  note: string
}) {
  const meta = useStore((state: any) => state.meta);
  const updMeta = useStore((state: any) => state.updateMeta);
  const [value, setValue] = useState(meta[propName] || '');
  const [mod, setMod] = useState('bg-gray-500');

  const update = () => {
    updMeta(propName, value);
  }

  const check = (e: any) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    (value.length < min || value.length > max) && setMod('bg-gray-500');
    (value.length > min && value.length <= max) && setMod('bg-lime-500');
  }, [value, min, max])

  return (
    <label className="text-sm w-full block mt-3">
      <div className="flex items-center">
        <span className="capitalize">{propName}</span>
        <span className={`text-xs ms-auto rounded-xl px-1 ${mod}`}>{value.length}</span>
      </div>
      <textarea
        onBlur={update}
        onInput={check}
        className="p-1 text-slate-700 w-full rounded"
        name="meta_description"
        value={value}>
      </textarea>
      <div className="text-xs text-stone-300 pt-1">
        {note}
      </div>
    </label>
  )
}