"use client"

import useStore from '@/store/store';
import { Rnd, RndResizeCallback } from 'react-rnd';
import { CreateLayerWidget } from './create_layer_widget';
import { Constructor__Aside } from './aside';
import { FontLib } from './font_lib';
import { Icon } from '../ui/icon';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { parseProp } from '../profile/minisites/client';
import { MiniPanel } from './minipanel/minipanel';
import { Layers } from './main/layers';
import { Markup } from './main/markup';
import { SingleMoveable } from './layer_moveable';
import { Copyright } from './main/copyright';
import { General_Site_Options } from './site_options/site_options';

export default function Main<ReactNode>(
  { siteid, author, initialContent }:
    { siteid: string, author: string, initialContent: string }) {

  const [editSite, setEditSite] = useState(false);
  const { data: session } = useSession()
  const layers = useStore((state: any) => state.layers)
  const CS = useStore((state: any) => state.constructor_size)
  const action = useStore((state: any) => state.updateStoreProp)
  const undo = useStore((state: any) => state.undo)
  const groupLayers = useStore((state: any) => state.group)

  const constructor_body_style =
    session && session.user?.email === author
      ? { height: 'calc(100vh - 32px)' } : {}

  const fixedSize: RndResizeCallback = (e, dir, ref, delta, position) => {
    action(
      'constructor_size',
      { width: CS.width, height: parseProp(CS.height.toString()) + delta.height + 'px' }
    )
  }

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (session && editSite) {
        // use history
        if (event.code === "KeyZ"
          && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          undo()
        }
        // use grouped layers
        if (event.code === "KeyG"
          && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          groupLayers()
        }
        // use clear active layers
        if (event.key === "Escape") {
          event.preventDefault();
          action('activeLayers', [])
        }
      }
    })
  }, [session, editSite, undo])

  useEffect(() => {
    localStorage.setItem('constructor', '0')
    const initialProps = JSON.parse(initialContent)
    action('siteid', siteid)
    action('author', author)
    action('constructor_size', initialProps.constructor_size || { width: '360px', height: '800px' })
    action('fonts', initialProps.fonts || {})
    action('layers', initialProps.layers || {})
    localStorage.setItem('constructor', '1')
  }, [])

  return (
    <div className={`h-screen overflow-hidden mx-auto ${editSite ? 'container' : null}`}>

      {session && session.user?.email === author ?
        <div
          style={{ zIndex: 99999 }}
          className="px-2 w-full flex justify-between items-center bg-slate-800 text-stone-100">

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

            {editSite ?
              <>
                <General_Site_Options />
                <FontLib />
              </>
              : null}

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
        <div className={`relative ${editSite ? 'w-full' : 'w-full'}`}>
          <section
            id='mw__constructor'
            className={`h-screen overflow-y-scroll scrollbar mx-auto relative`}
            style={{ ...constructor_body_style }}>
            <div
              className="m-auto relative my-5 w-fit">
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
                    width: '20%',
                    zIndex: 99999
                  }
                }}
                resizeHandleClasses={{ bottom: 'bg-amber-500 rounded' }}
                className='mainwrapper border border-stone-300 bg-white mx-auto overflow-hidden'
                style={{ position: 'static' }}
              >
                {
                  <Layers editSite={editSite} author={author} layers={layers} />
                }
              </Rnd>
              {editSite ? <><SingleMoveable /><Markup /></> : null}
            </div>
            <Copyright />
          </section>
          {editSite ? <><MiniPanel /></> : null}
        </div>
        {/* {editSite ? <Panel /> : null} */}
      </div >
    </div >
  )
}