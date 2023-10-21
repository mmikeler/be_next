"use client"

import { useStore } from '@/store/store';
import { Type_Icon } from './icons';
import { Icon } from '../ui/icon';
import { useEffect, useState } from 'react';


export function Constructor__Aside<ReactNode>() {
  const nav = useStore((state: any) => state.navigation)
  const layers = useStore((state: any) => state.layers)
  const action = useStore((state: any) => state.updateStoreProp)

  const navigation = []
  for (let pointID in nav) {
    navigation.push(<Layer key={pointID} id={nav[pointID]} />)
  }

  useEffect(() => {
    if (nav.length === 0) {
      action('navigation', Object.keys(layers))
    }
  }, [])

  return (
    <aside className="w-2/12 bg-slate-700 p-2 text-stone-100 scrollbar overflow-y-auto" style={{ height: 'calc(100vh - 32px)' }}>
      {navigation && navigation}
    </aside>
  )
}

function Layer({ id }: { id: string | object }) {
  const layer = useStore((state: any) => {
    const key = id as keyof typeof state.layers;
    return state.layers[key]
  })

  if (typeof id === 'object') {
    return <Layer__Group data={id} />
  }

  if (layer) {
    return <Layer__Single data={layer} />
  }
}

function Layer__Single(params: any) {
  const { id, layerType, title, style } = params.data
  const action = useStore((state: any) => state.updateStoreProp)
  const activeLayers = useStore((state: any) => state.activeLayers)
  const isActive = activeLayers.includes(id) ? 'text-slate-700 bg-amber-400' : ''

  const addLayerToChange = (e: any) => {
    if (e.ctrlKey) {
      action('activeLayers', activeLayers.concat([id]))
    }
    else {
      action('activeLayers', [id])
    }
  }

  return (
    <div
      className={`mt-1 flex items-center text-xs p-1 rounded cursor-pointer ${isActive}`}
      onClick={addLayerToChange}>
      <span className='me-1 text-sm' style={
        layerType === 'block' ? { color: style.backgroundColor } : {}
      }>
        <Type_Icon type={layerType} />
      </span>
      {title}
    </div>
  )
}

function Layer__Group(params: any) {
  const group = params.data
  const action = useStore((state: any) => state.updateStoreProp)
  const activeLayers = useStore((state: any) => state.activeLayers)
  const [open, setOpen] = useState(false);

  const addGroupToChange = () => {

  }

  return (
    <div className="mt-1 px-1 text-xs">
      <div className='cursor-pointer flex justify-between'>
        <span className='w-full' onClick={addGroupToChange}>{group?.title}</span>
        <span onClick={() => setOpen(!open)}>
          <Icon
            className="ms-1 text-lg"
            tag={open ? 'chevron_right' : `expand_more`} />
        </span>
      </div>
      <div className={open ? `hidden` : ''}>
        {
          Object.keys(group.items || []).map((id: string, ind: number) => {
            return (
              <Layer key={ind} id={id} />
            )
          })
        }
      </div>
    </div>
  )
}