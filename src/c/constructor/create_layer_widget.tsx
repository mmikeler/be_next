import useStore from "@/src/store/store";
import { Gallery } from "./gallery/gallery";
import { Type_Icon } from "./icons";
import { useState } from "react";
import { Icon } from "../ui/icon";
import { Menu__Overlay } from "./main";
import Modules from "./_modules/modules";


export function CreateLayerWidget() {
  const addLayer = useStore((state: any) => state.addLayer)

  return (
    <div className="flex items-center w-fit text-2xl ms-auto">

      {/* Блок */}
      <div onClick={() => addLayer('block')} className="m-1 flex hover:text-lime-500 transition-all cursor-pointer">
        <Type_Icon type="block" />
      </div>

      {/* Текст */}
      <div onClick={() => addLayer('text')} className="m-1 flex hover:text-lime-500 transition-all cursor-pointer">
        <Type_Icon type="text" />
      </div>

      {/* Изображение */}
      <Gallery />

      {/* Modules */}
      <Modules />

      {/* Другие типы */}
      <Ext />

    </div>
  )
}

function Ext() {
  const [open, setOpen] = useState(false);
  const addLayer = useStore((state: any) => state.addLayer)

  const add = (type: string) => {
    addLayer(type)
    setOpen(false)
  }

  return (
    <>
      <div className={`flex px-1 py-1 -mr-2 cursor-pointer`}>
        <div
          className="m-auto flex text-2xl"
          onClick={() => setOpen(!open)}>
          <Icon className="m-auto" tag={'more_vert'} />
        </div>
      </div>

      {open ?
        <Menu__Overlay>

          {/* Код */}
          <div
            onClick={() => add('code')}
            className="cursor-pointer border border-stone-400 w-24 h-24 flex flex-col justify-center items-center bg-slate-700 border-stone-100 text-center">
            <Icon className="block text-4xl" tag="code_blocks" />
            <div className='text-xs'>Код</div>
          </div>

          {/* Редактор текста */}
          <div
            onClick={() => add('texteditor')}
            className="cursor-pointer border border-stone-400 w-24 h-24 flex flex-col justify-center items-center bg-slate-700 border-stone-100 text-center">
            <Icon className="block text-4xl" tag="edit_note" />
            <div className='text-xs'>Редактор текста</div>
          </div>

          {/* Карта */}

          {/* Таймер */}

        </Menu__Overlay>
        : null}
    </>
  )
}