"use client"

import { useStore } from '@/store/store';
import { Type_Icon } from './icons';


export function Constructor__Aside<ReactNode>() {
  const layers = useStore((state: any) => state.layers)
  return (
    <aside className="w-2/12 bg-slate-700 p-2 text-stone-100 scrollbar overflow-y-auto" style={{ height: 'calc(100vh - 32px)' }}>
      {
        Object.values(layers).map((layer: any, ind: Number) => {
          return <Layer key={ind} data={layer} />
        })
      }
    </aside>
  )
}

function Layer(params: any) {
  const { id, layerType, title } = params.data
  const action = useStore((state: any) => state.updateStoreProp)
  const activeLayer = useStore((state: any) => state.activeLayer)
  const isActive = activeLayer === id ? 'text-slate-700 bg-amber-400' : ''

  return (
    <div
      className={`flex items-center text-xs p-1 rounded cursor-pointer ${isActive}`}
      onClick={() => action('activeLayer', id)}>
      <span className='me-1 text-sm'>
        <Type_Icon type={layerType} />
      </span>
      {title}
    </div>
  )
}