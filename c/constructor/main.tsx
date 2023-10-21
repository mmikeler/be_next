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
import { LayerComponent, parseProp } from '../profile/minisites/client';
import Moveable, { OnDrag, OnResize, OnRotate } from 'react-moveable';

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
        // use history
        if (event.code === "KeyG"
          && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          groupLayers()
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
    action('navigation', initialProps.navigation || {})
    localStorage.setItem('constructor', '1')
  }, [])

  return (
    <div className={`h-screen overflow-hidden mx-auto ${editSite ? 'container' : null}`}>

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
          id='mw__constructor'
          className={`${editSite ? 'w-7/12' : 'w-full'} bg-stone-100 h-screen overflow-y-scroll scrollbar mx-auto`}
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
                  width: '20%',
                  zIndex: 99999
                }
              }}
              resizeHandleClasses={{ bottom: 'bg-amber-500 rounded' }}
              className='mainwrapper border border-stone-300 bg-white mx-auto overflow-hidden'
              style={{ position: 'static' }}
            >
              {
                Object.values(layers).map((layer: any, ind: Number) => {
                  return (
                    <LayerComponent
                      key={ind}
                      edit={editSite}
                      data={layer}
                      author={author} />)
                })
              }
            </Rnd>
            {editSite ? <SingleMoveable /> : null}
          </div>
          <div className="mb-4 text-sm text-center text-stone-400">
            <div>Автор: {author}</div>
            <div className="ms-2">Сайт создан и размещён при помощи <Link className='underline hover:text-lime-600' target='_blank' href="https://miniw3b.ru">Miniw3b</Link></div>
          </div>
        </section>

        {editSite ? <Panel /> : null}
      </div >
    </div >
  )
}

function SingleMoveable(params: any) {
  const layers = useStore((state: any) => state.layers)
  const fixed = useStore((state: any) => state.updateLayer)
  const multyFixed = useStore((state: any) => state.updateLayers)
  // Subscribe to update
  const activeLayers = useStore((state: any) => state.activeLayers)

  const fixedStyle = (e: any) => {
    const c = e.target.style
    const id = e.target.id
    if (c) {
      fixed({
        ...layers[id], style: {
          ...layers[id].style,
          transform: c.transform,
          width: c.width,
          height: c.height,
          backgroundColor: c.backgroundColor
        }
      })
    }
  }

  const fixedStyles = (events: any) => {
    const updates: any = []
    events.forEach((ev: any) => {
      updates.push({
        id: ev.target.id,
        newstyle: ev.target.style
      })
    });
    multyFixed(updates)
  }

  return (
    <Moveable
      key={new Date().getTime()} // Ключ для синхронизации изменений
      target={'.lm'}

      checkInput={true}
      origin={false}
      draggable={true}
      onDrag={({
        target,
        beforeDelta, beforeDist,
        left, top,
        right, bottom,
        delta, dist,
        transform,
        clientX, clientY,
      }: OnDrag) => {
        target!.style.transform = transform;
      }}
      resizable={true}
      onResize={({
        target, width, height,
        dist, delta, direction,
        clientX, clientY,
      }: OnResize) => {
        delta[0] && (target!.style.width = `${width}px`);
        delta[1] && (target!.style.height = `${height}px`);
      }}
      onRotate={({
        target,
        delta, dist,
        transform,
        clientX, clientY,
      }: OnRotate) => {
        target!.style.transform = transform;
      }}
      rotatable={true}
      onDragEnd={fixedStyle}
      onResizeEnd={fixedStyle}
      onRotateEnd={fixedStyle}
      //
      // Groups Events
      //
      onDragGroup={({ events }) => {
        events.forEach(ev => {
          ev.target.style.transform = ev.transform;
        });
      }}
      onResizeGroup={({ events }) => {
        events.forEach(ev => {
          ev.target.style.width = `${ev.width}px`;
          ev.target.style.height = `${ev.height}px`;
          ev.target.style.transform = ev.drag.transform;

        });
      }}
      onRotateGroup={({ events }) => {
        events.forEach(ev => {
          ev.target.style.transform = ev.drag.transform;
        });
      }}
      onDragGroupEnd={({ events }) => {
        fixedStyles(events)
      }}
      onResizeGroupEnd={({ events }) => {
        fixedStyles(events)
      }}
      onRotateGroupEnd={({ events }) => {
        fixedStyles(events)
      }}
    />
  )
}