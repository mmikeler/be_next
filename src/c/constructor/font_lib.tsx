"use client"

import { motion } from "framer-motion"
import { Icon } from "../ui/icon"
import { useState } from "react";
import useStore from "@/src/store/store";
import { fontLibrary } from "@/src/app/fonts";
import { NextFont } from "next/dist/compiled/@next/font";
import { getRandomInt } from "../profile/minisites/client";
import { Custom_Fonts_Library } from "./custom_fonts";

export function FontLib(params: any) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [customFontsList, setCustomFontsList] = useState<any>(null);

  const tabClass = 'text-center p-1 border-b border-amber-500 cursor-pointer';
  const activeTabClass = 'bg-amber-500 cursor-default';

  return (
    <>
      <div onClick={() => setOpen(!open)} className={`m-1 text-2xl flex ${open && 'text-lime-500'} hover:text-lime-500 transition-all cursor-pointer`}>
        <Icon tag={'text_fields'} />
      </div>

      {open &&
        <motion.div
          style={{ zIndex: 9999 }}
          animate={{ right: 0 }}
          className="fixed top-8 flex flex-col -right-60 h-screen w-80 max-w-full bg-stone-700 p-5 pb-20 overflow-y-auto scrollbar">
          <div className="uppercase">Библиотека шрифтов</div>
          <p className="text-xs mb-5">
            Отметьте шрифты, которые хотите использовать на этом сайте.
            Мы не рекомендуем использовать более трёх шрифтов для одной страницы.
          </p>

          {/* Font Tabs */}
          <div className="grid grid-cols-2 mb-5">
            <div
              onClick={() => setTab(0)}
              className={`${tabClass} ${tab === 0 ? activeTabClass : ''}`}>Google Fonts</div>
            <div
              onClick={() => setTab(1)}
              className={`${tabClass} ${tab === 1 ? activeTabClass : ''}`}>От Авторов</div>
          </div>

          {/* Google Fonts list */}
          {(fontLibrary && tab === 0) &&
            fontLibrary.map((font, ind) => {
              return <Font_List_Item key={ind} font={font} />
            })
          }

          {/* Custom fonts list */}
          {tab === 1 && <Custom_Fonts_Library />}

        </motion.div>
      }
    </>
  )
}

export type Font = {
  title: string,
  set: NextFont
}

function Font_List_Item({ font }: { font: Font }) {
  const add = useStore((state: any) => state.addFont)
  const remove = useStore((state: any) => state.removeFont)
  const isChecked = useStore((state: any) => state.isFontChecked)
  const [checked, setChecked] = useState(isChecked(font));
  const [pangramLocal, setPangramLocal] = useState('RU');

  const onchange = (e: any) => {
    e.target.checked ?
      add(font)
      : remove(font)

    setChecked(isChecked(font))
  }

  return (
    <div className={`mt-4 ${checked ? 'order-1' : 'order-3'}`}>
      <div className="flex items-center">

        <input
          id={font.title}
          checked={checked}
          onChange={onchange}
          type="checkbox"
          name={font.title.toLowerCase()} />

        <label htmlFor={font.title} className="checkbox-label"></label>

        <div className="text-sm ms-2">{font.title}</div>

        <div className="ms-auto text-xs">
          <span onClick={() => setPangramLocal('RU')} className={`cursor-pointer hover:underline mx-1 ${pangramLocal === 'RU' ? 'text-amber-400' : ''}`}>RU</span>
          <span onClick={() => setPangramLocal('EN')} className={`cursor-pointer hover:underline mx-1 ${pangramLocal === 'EN' ? 'text-amber-400' : ''}`}>EN</span>
          <span onClick={() => setPangramLocal('Symbols')} className={`cursor-pointer hover:underline mx-1 ${pangramLocal === '123' ? 'text-amber-400' : ''}`}>[*]</span>
        </div>

      </div>
      <div className="mt-1 bg-stone-100 text-stone-700 p-2 rounded">
        <div className={font.set.className}>
          {getPangram(pangramLocal)}
        </div>
      </div>
    </div>
  )
}

export function getPangram(local: string) {
  const RU = pangramsRU
  const EN = pangramsEN
  const Symbols = pangramsSymbols
  const l = eval('pangrams' + local)
  return l[getRandomInt(l.length)]
}

const pangramsRU = [
  'Эй, жлоб! Где туз? Прячь юных съёмщиц в шкаф.',
  'Эй, цирюльникъ, ёжик выстриги, да щетину ряхи сбрей, феном вошь за печь гони!',
  'Экс-граф? Плюш изъят. Бьём чуждый цен хвощ!',
  'Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч.',
  'В чащах юга жил-был цитрус... — да, но фальшивый экземпляръ!',
  'Южно-эфиопский грач увёл мышь за хобот на съезд ящериц.',
  'Аэрофотосъёмка ландшафта уже выявила земли богачей и процветающих крестьян.',
  'Шифровальщица попросту забыла ряд ключевых множителей и тэгов.',
  'Съешь ещё этих мягких французских булок, да выпей же чаю.',
  'Шалящий фавн прикинул объём горячих звезд этих вьюжных царств.'
]

const pangramsEN = [
  'Brick quiz whangs jumpy veldt fox!',
  'Quick wafting zephyrs vex bold Jim.',
  'Sphinx of black quartz judge my vow!',
  'The five boxing wizards jump quickly.',
  'Mr. Jock, TV quiz Ph.D., bags few lynx.',
]

const pangramsSymbols = [
  '01234567890_-[]()""<>?!:;.,'
]