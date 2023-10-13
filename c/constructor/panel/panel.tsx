import { useStore } from "@/store/store"
import { Panel__Widget } from "./widget"
import { Size } from "../fields/size"
import { Position } from "../fields/position"
import { Colors } from "../fields/colors"
import { Border } from "../fields/border"
import { FontField } from "../fields/text"
import { HTML_, Link_ } from "../fields"


export function Panel() {
  const activeLayer = useStore((state: any) => state.activeLayer)
  const L = useStore((state: any) => state.layers[activeLayer])
  const action = useStore((state: any) => state.deleteLayer)
  const action2 = useStore((state: any) => state.updateLayer)

  const saveTitle = (e: any) => {
    action2({ ...L, title: e.target.innerText })
  }

  return (
    <div
      style={{ width: 'max(25%, 250px)' }}
      className="w-3/12 h-screen bg-slate-700 text-stone-100 text-xs pb-20">
      <div className="mb-2 px-3 py-1 text-sm border-b-2 border-slate-500">
        {L ?
          <div onBlur={saveTitle} contentEditable={true}>{L.title}</div>
          : 'Выберите слой'}
      </div>

      {activeLayer &&
        <div className="flex flex-col h-full">
          <Panel__Widget title="Размер">
            <Size />
          </Panel__Widget>
          <Panel__Widget title="Положение">
            <Position />
          </Panel__Widget>
          <Panel__Widget title="Обводка">
            <Border />
          </Panel__Widget>

          <AD_FIELDS layerType={L.layerType} />

          <div onClick={action} className="cursor-pointer bg-red-500 text-white mt-auto p-3 text-center hover:bg-red-700">
            Удалить слой
          </div>
        </div>
      }

    </div>
  )
}

function AD_FIELDS(props: any) {
  switch (props.layerType) {
    case 'text':
      return (
        <>
          <Panel__Widget title={'Шрифт'}>
            <FontField />
          </Panel__Widget>
          <Panel__Widget>
            <Colors />
          </Panel__Widget>
          <Panel__Widget title="Ссылка">
            <Link_ />
          </Panel__Widget>
        </>
      )

    case 'block':
      return (
        <>
          <Panel__Widget>
            <Colors />
          </Panel__Widget>
          <Panel__Widget title="Ссылка">
            <Link_ />
          </Panel__Widget>
        </>
      )

    case 'image':
      return (
        <>
          <Panel__Widget title="Ссылка">
            <Link_ />
          </Panel__Widget>
        </>
      )

    case 'code':
      return (
        <>
          <Panel__Widget title="HTML">
            <HTML_ />
          </Panel__Widget>
        </>
      )

    default:
      return null
  }
}