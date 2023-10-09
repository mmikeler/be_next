"use client"

import { useStore } from '@/store/store';
import { Rnd, RndResizeCallback } from 'react-rnd';
import { CreateLayerWidget } from './create_layer_widget';
import { Constructor__Aside } from './aside';
import { Panel } from './panel/panel';
import { LayerMoveable } from './layer_moveable';
import { FontLib } from './font_lib';
import { Icon } from '../ui/icon';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'

export default function Main<ReactNode>(
  { siteid, author, initialContent }:
    { siteid: string, author: string, initialContent: string }) {

  const [editSite, setEditSite] = useState(false);
  const { data: session } = useSession()
  const layers = useStore((state: any) => state.layers)
  const CS = useStore((state: any) => state.constructor_size)
  const action = useStore((state: any) => state.updateStoreProp)

  const fixedSize: RndResizeCallback = (e, dir, ref, delta, position) => {
    action(
      'constructor_size',
      { width: CS.width, height: CS.height + delta.height }
    )
  }

  useEffect(() => {
    localStorage.setItem('constructor', '0')
    const initialProps = JSON.parse(initialContent)
    action('siteid', siteid)
    action('author', author)
    action('constructorSize', initialProps.constructorSize || { width: '360px', height: '800px' })
    action('fonts', initialProps.fonts || {})
    action('layers', initialProps.layers || {})
    localStorage.setItem('constructor', '1')
  }, [])

  return (
    <div className='h-screen overflow-hidden container mx-auto' style={{ maxWidth: '900px' }}>

      {session && session.user?.email === author ?
        <div className="px-2 w-full flex justify-between items-center bg-slate-800 text-stone-100">

          <div className='flex'>
            <Link className='flex mx-1' href="/">
              <Icon className="text-2xl m-auto" tag={'home'} />
            </Link>
            <Link className='flex mx-1' href="/profile">
              <Icon className="text-2xl m-auto" tag={'person'} />
            </Link>
          </div>

          {editSite ? <CreateLayerWidget /> : null}

          <div className='flex items-center'>

            {editSite ? <FontLib /> : null}
            <div className="border-l flex w-8 h-8 px-2 py-1 cursor-pointer">
              <div className="m-auto" onClick={() => setEditSite(!editSite)}>
                {editSite ?
                  <Icon className="text-2xl" tag={'visibility'} />
                  : <Icon className="text-2xl" tag={'edit'} />
                }
              </div>
            </div>
          </div>

        </div>
        : null
      }


      <div className="flex">
        {editSite ? <Constructor__Aside /> : null}
        <section
          className={`${editSite ? 'w-full' : 'w-7/12'} bg-stone-100 h-screen overflow-y-scroll scrollbar mx-auto`}
          style={session && session.user?.email === author ? { height: 'calc(100vh - 32px)' } : {}}>
          <div
            className="m-auto relative my-5 pb-10 w-fit">
            <Rnd
              position={{ x: 0, y: 0 }}
              size={{ width: CS.width, height: CS.height }}
              disableDragging={true}
              enableResizing={(session && editSite) ? { bottom: true } : {}}
              onResizeStop={fixedSize}
              resizeHandleStyles={{
                bottom: {
                  bottom: '5px',
                  height: '5px',
                  marginLeft: '40%',
                  marginRight: '40%',
                  width: '20%'
                }
              }}
              resizeHandleClasses={{ bottom: 'bg-amber-500 rounded' }}
              className='mainwrapper border border-stone-300 bg-white mx-auto overflow-hidden'
              style={{ position: 'static' }}
            >
              {
                Object.values(layers).map((layer: any, ind: Number) => {
                  return <LayerMoveable key={ind} data={layer} edit={editSite} />
                })
              }
            </Rnd>
          </div>
          <div className="mb-4 text-sm text-center text-stone-400">
            <div>Автор: {author}</div>
            <div className="ms-2">Сайт создан и размещён при помощи <Link className='underline hover:text-lime-600' target='_blank' href="https://ms.be-original.ru">Miniweb</Link></div>
          </div>
        </section>

        {editSite ? <Panel /> : null}
      </div >
    </div >
  )
}