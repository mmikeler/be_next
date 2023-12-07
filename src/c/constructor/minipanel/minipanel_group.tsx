import { useContext } from "react"
import { MinipanelContext } from "./minipanel"
import useStore from "@/src/store/store"
import { Icon } from "@/src/c/ui/icon"


export function Minipanel__Group(params: any) {
  const G: any = useContext(MinipanelContext)
  const delete_action = useStore((state: any) => state.deleteLayer_)
  const copy_action = useStore((state: any) => state.copyContent)
  const groupLayers = useStore((state: any) => state.group)
  const mod = "mx-1 flex items-center text-stone-300 cursor-pointer hover:text-stone-100 transition-all"

  const deleteLayer = () => {
    if (confirm('Удалить слои?')) {
      delete_action(G.id)
    }
  }

  const copyContent = () => {
    copy_action(G.id)
  }

  return (
    <div className="text-2xl flex items-center">

      {/* Группировка */}
      <div onClick={groupLayers} className={mod} title='Копировать'>
        <Icon tag="cards" />
      </div>

      {/* Разделитель */}
      <div className="bg-slate-500 h-6 ml-auto me-1" style={{ width: '2px' }}></div>

      {/* Копирование */}
      <div onClick={copyContent} className={mod} title='Копировать'>
        <Icon tag="content_copy" />
      </div>

      {/* Удаление */}
      <div onClick={deleteLayer} className={mod} title='Удалить слой'>
        <Icon className="" tag="delete" />
      </div>

    </div>
  )
}