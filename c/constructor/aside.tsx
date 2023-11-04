"use client"

import useStore from '@/store/store';
import { Type_Icon } from './icons';
import { Icon } from '../ui/icon';
import { useState } from 'react';

export function Constructor__Aside<ReactNode>() {
  const layers = useStore((state: any) => state.layers)

  const navigation = []
  for (let layer in layers) {
    navigation.push(<Layer key={layer} data={layers[layer]} path={''} />)
  }

  return (
    <aside
      className="bg-slate-700 p-2 text-stone-100 scrollbar overflow-y-auto"
      style={{ height: 'calc(100vh - 32px)', width: 'max(20%, 200px)' }}>
      {navigation && navigation}
    </aside>
  )
}

function Layer({ data, path }: { data: any, path: string }) {

  if (data?.items) {
    return (
      <Layer__Group
        data={data}
        path={path.length > 0 ? path + '.' + data.id : data.id} />)
  }

  if (data?.style) {
    return (
      <Layer__Single
        data={data}
        path={path.length > 0 ? path + '.' + data.id : data.id} />)
  }
}

function Layer__Single(params: any) {
  const { id, layerType, title, style } = params.data
  const [t, setTitle] = useState(title);
  const action = useStore((state: any) => state.updateStoreProp)
  const activeLayers = useStore((state: any) => state.activeLayers)
  const upd = useStore((state: any) => state.updateLayer_)
  const isLayerActive = useStore((state: any) => state.isLayerActive_(params.path))
  const isActive = isLayerActive ? 'text-slate-700 bg-amber-400' : ''
  // Subscribe
  const layers = useStore((state: any) => state.layers)

  const addLayerToChange = (e: any) => {
    if (e.ctrlKey) {
      action('activeLayers', activeLayers.concat([id.toString()]))
    }
    else {
      action('activeLayers', [id.toString()])
    }
  }

  const saveTitle = (e: any) => {
    setTitle(e.target.innerText)
    let newdata = { ...params.data }
    newdata.title = e.target.innerText
    upd(id, newdata)
  }

  return (
    <div
      className={`mt-1 flex items-center text-xs px-1 rounded cursor-pointer ${isActive}`}
      onClick={addLayerToChange}>
      {params.groupped ? <Icon className="text-stone-400" tag="line_start_diamond" /> : null}
      <span className='mx-1 text-sm' style={
        layerType === 'block' ? { color: style.backgroundColor } : {}
      }>
        <Type_Icon type={layerType} />
      </span>
      <span
        onBlur={saveTitle}
        className={`px-1 ${isLayerActive ? 'cursor-text' : ''}`}
        contentEditable={isLayerActive}
        dangerouslySetInnerHTML={{ __html: t }}
      ></span>
    </div>
  )
}

function Layer__Group(params: any) {
  const group = params.data
  const usp = useStore((state: any) => state.updateStoreProp)
  const upd = useStore((state: any) => state.updateLayer_)
  const activeLayers = useStore((state: any) => state.activeLayers)
  const isGroupActive = useStore((state: any) => state.isLayerActive_(params.path))
  const isActive = isGroupActive ? 'text-slate-700 bg-amber-400' : ''
  const [open, setOpen] = useState(false);
  const [t, setTitle] = useState(group.title);

  const addGroupToChange = (e: any) => {
    if (e.ctrlKey) {
      usp('activeLayers', activeLayers.concat([group.id]))
    }
    else {
      usp('activeLayers', [group.id])
    }
  }

  const saveTitle = (e: any) => {
    setTitle(e.target.innerText)
    let newdata = { ...params.data }
    newdata.title = e.target.innerText
    upd(group.id, newdata)
  }

  return (
    <div className="mt-1 px-1 text-xs">
      <div className={`flex items-center py-1 text-xs rounded cursor-pointer ${isActive}`}>
        <span
          onClick={addGroupToChange}
          onBlur={saveTitle}
          className={`px-2 ${isActive ? 'cursor-text' : ''}`}
          contentEditable={isGroupActive}
          dangerouslySetInnerHTML={{ __html: t }}
        ></span>
        <span className='ms-auto h-4' onClick={() => setOpen(!open)}>
          <Icon
            className="pr-1 text-lg"
            tag={open ? 'expand_less' : `expand_more`} />
        </span>
      </div>
      <div className={!open ? `hidden` : 'ml-2 border-l border-slate-500'}>
        {
          Object.values(group?.items || {}).map((data: any, ind: number) => {
            return (
              <Layer key={ind} data={data} path={params.path} />
            )
          })
        }
      </div>
    </div>
  )
}