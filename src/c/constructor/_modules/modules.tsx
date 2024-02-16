import { useState } from "react";
import useStore from "@/src/store/store";
import { Icon } from "../../ui/icon";
import { Menu__Overlay } from "../main";

export default function Modules() {
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
          className="m-auto flex text-2xl hover:text-lime-500"
          onClick={() => setOpen(!open)}>
          <Icon className="m-auto" tag={'dashboard_customize'} />
        </div>
      </div>

      {open ?
        <Menu__Overlay>

          {/* Таймер */}
          <div
            onClick={() => add('module_timer')}
            className="cursor-pointer border border-stone-400 w-24 h-24 flex flex-col justify-center items-center bg-slate-700 border-stone-100 text-center">
            <Icon className="block text-4xl" tag="timer" />
            <div className='text-xs'>Таймер</div>
          </div>

        </Menu__Overlay>
        : null}
    </>
  )
}