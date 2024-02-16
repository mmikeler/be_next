"use client"

import { useEffect, useState } from "react"
import useStore from "@/src/store/store";
import { split } from "lodash";
import { Font, getPangram } from "./font_lib";
import { AddFontForm } from "../ui/add_font_form";
import { get_custom_fonts } from "@/src/actions/get_custom_fonts";
import dynamic from "next/dynamic";

export type CustomFont = Font & { file: string };

export function Custom_Fonts_Library() {
  const [list, setList] = useState(null);
  const [fonts, setFonts] = useState<any>([]);

  useEffect(() => {
    const getFonts = async () => {
      const data = await get_custom_fonts();
      setFonts(data);
    }
    getFonts();
  }, [])

  useEffect(() => {
    const list = fonts.map((fontData: any, index: number) => {
      const fontName = split(fontData.url, '.')[0];

      const font: CustomFont = {
        title: fontName,
        file: '/api/fonts?id=' + fontData.id,
        set: {
          className: '__' + fontName + '__',
          style: {
            fontFamily: fontName
          }
        }
      }
      return <CustomFontLibraryElement key={index} font={font} />
    })
    setList(list);
  }, [fonts])

  return (
    <>
      <AddFontForm />
      {list &&
        <div className="flex flex-col">
          {list}
        </div>
      }
    </>
  )
}

function CustomFontLibraryElement({ font }: { font: CustomFont }) {
  const add = useStore((state: any) => state.addFont)
  const remove = useStore((state: any) => state.removeFont)
  const isChecked = useStore((state: any) => state.isFontChecked)
  const [checked, setChecked] = useState(isChecked(font, 'local'));
  const [pangramLocal, setPangramLocal] = useState('RU');

  const onchange = (e: any) => {
    e.target.checked ?
      add(font, 'local')
      : remove(font, 'local')

    setChecked(isChecked(font, 'local'));
  }

  return (
    <div className={`mt-4 ${checked ? 'order-1' : 'order-3'}`}>
      <div className="flex items-center">

        <style jsx global>{`
          @font-face {
            font-family: ${font.title};
            src: local(${font.title}), url(${font.file});
          }
          .__${font.title}__{
            font-family: ${font.title}
          }
          `}
        </style>

        <input
          id={font.title}
          checked={checked}
          onChange={onchange}
          type="checkbox"
          name={font.title} />

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