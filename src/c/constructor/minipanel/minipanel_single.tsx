import { Icon } from "@/src/c/ui/icon";
import { Colorpicker } from "../fields";
import { Type_Icon } from "../icons";
import { useContext, useState } from "react";
import { MinipanelContext } from "./minipanel";
import useStore from "@/src/store/store"
import { Minipanel__Subpanel } from "./subpanel";


export function Minipanel__Single(params: any) {
  const L: any = useContext(MinipanelContext)
  const delete_action = useStore((state: any) => state.deleteLayer_)
  const copy_action = useStore((state: any) => state.copyContent)
  const mod = "transition-all mx-1 flex items-center text-stone-300 cursor-pointer hover:mb-1 hover:text-stone-100 transition-all"
  const [subPanel, setsubPanel] = useState('size');

  const deleteContent = () => {
    if (confirm('Удалить слои?')) {
      delete_action(L.id)
    }
  }

  const copyContent = () => {
    copy_action(L.id)
  }

  return (
    <>
      <Minipanel__Subpanel content={subPanel} />
      <div className="text-2xl flex w-full items-center">

        {/* Общие настройки */}
        <div className="flex items-center">
          <div
            onClick={() => setsubPanel('size')}
            className={`${mod} ms-auto ${subPanel === 'size' ? 'text-lime-400' : ''}`}
            title='Размер и положение'>
            <Icon tag="resize" />
          </div>

          {L.layerType === 'block' || L.layerType === 'image' || L.layerType === 'text' ?
            <div
              onClick={() => setsubPanel('link')}
              className={`${mod} ${subPanel === 'link' ? 'text-lime-400' : ''}`}
              title='Ссылка'>
              <Icon tag="link" />
            </div>
            : null
          }

          <div
            onClick={() => setsubPanel('border')}
            className={`${mod} ${subPanel === 'border' ? 'text-lime-400' : ''}`}
            title='Обводка'>
            <Icon tag="border_style" />
          </div>

          <div
            onClick={() => setsubPanel('effects')}
            className={`${mod} ${subPanel === 'effects' ? 'text-lime-400' : ''}`}
            title='Эффекты'>
            <Icon tag="flare" />
          </div>

          {L.layerType === 'text'
            || L.layerType === 'texteditor'
            || L.layerType === 'module_timer' ?
            <div
              onClick={() => setsubPanel('text')}
              className={`${mod} ${subPanel === 'text' ? 'text-lime-400' : ''}`}
              title='Атрибуты текста'>
              <Icon tag="text_format" />
            </div>
            : null
          }

          {L.layerType !== 'image' ?
            <div
              title="Цвет заливки"
              className={`${mod} border-2 border-slate-300 hover:border-slate-100 rounded-full overflow-hidden`}>
              <Colorpicker styleProp="backgroundColor" label={false} />
            </div>
            : null
          }
        </div>

        {/* Уникальные настройки */}
        <div className="flex mx-auto bg-sky-500 p-1">
          {L.layerType === 'code' ?
            <div
              onClick={() => setsubPanel('code')}
              title="Вставка кода"
              className={`${mod}`}>
              <Icon className="text-white hover:mb-1" tag="code" />
            </div>
            : null
          }

          {L.layerType === 'module_timer' ?
            <div
              onClick={() => setsubPanel('module_timer')}
              title="Таймер"
              className={`${mod}`}>
              <Icon className="text-white hover:mb-1" tag="timer" />
            </div>
            : null
          }
        </div>

        {/* Опции управления */}
        <div className="flex">
          <div onClick={copyContent} className={mod} title='Копировать'>
            <Icon tag="content_copy" />
          </div>
          <div onClick={deleteContent} className={mod} title='Удалить слой'>
            <Icon tag="delete" />
          </div>
        </div>

      </div>
    </>
  )
}