"use client"

import useStore from '@/src/store/store';
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
import { motion } from "framer-motion"

export default function Main<ReactNode>(
  { siteid, author, initialContent }:
    { siteid: string, author: string, initialContent: string }) {

  const [editSite, setEditSite] = useState(false);
  const { data: session } = useSession()
  const mainlayer = useStore((state: any) => state.mainlayer)
  const layers = useStore((state: any) => state.layers)
  const CS = useStore((state: any) => state.constructor_size)
  const action = useStore((state: any) => state.updateStoreProp)
  const undo = useStore((state: any) => state.undo)
  const groupLayers = useStore((state: any) => state.group)

  const constructor_body_style =
    session && session.user?.email === author
      ? { height: 'calc(100dvh - 32px)' } : {}

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
    action('mainlayer', initialProps.mainlayer || {})
    action('layers', initialProps.layers || {})
    localStorage.setItem('constructor', '1')
  }, [])

  return (
    <div className={`h-screen overflow-hidden mx-auto ${editSite ? 'container' : null}`}>

      {session && session.user?.email === author ?
        <div
          style={{ zIndex: 99999 }}
          className="px-2 w-full flex justify-between items-center bg-slate-800 text-stone-100">

          {editSite ?
            <div
              id="toggleNav"
              className={`border-r flex px-1 -ms-2 py-1 cursor-pointer`}
              title='Навигация'>
              <Icon className="text-2xl m-auto" tag="left_panel_open" />
            </div>
            : null}

          {editSite ? <CreateLayerWidget /> : null}

          {/* 
            Переключатель конструктора
          */}
          <div className='flex items-center ms-auto'>

            {editSite ?
              <div className='border-l flex'>
                <General_Site_Options />
                <FontLib />
              </div>
              : null}

            <div className={`border-l flex px-1 py-1 cursor-pointer`}>
              <div className="m-auto flex text-2xl" onClick={() => setEditSite(!editSite)}>
                {editSite ?
                  <Icon className="m-auto" tag={'visibility'} />
                  : <Icon className="m-auto" tag={'edit'} />
                }
              </div>
            </div>

            <Menu />

          </div>

        </div>
        : null
      }

      <div className="flex relative">
        {editSite ? <Constructor__Aside /> : null}
        <div className={`relative w-full`}>
          <section
            id='mw__constructor'
            className={`h-screen overflow-y-scroll overflow-x-hidden scrollbar mx-auto relative`}
            style={{ ...constructor_body_style }}>
            <div
              className="m-auto relative my-5 w-fit">
              <Rnd
                id="mainlayer"
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
                className={`mainwrapper border border-stone-300 mx-auto overflow-hidden ${mainlayer.fontClass}`}
                style={{ ...mainlayer, position: 'static' }}
              >
                {
                  <Layers editSite={editSite} author={author} layers={layers} />
                }
              </Rnd>
              {editSite ? <><SingleMoveable /><Markup /></> : null}
            </div>
            <Copyright siteid={siteid} />
          </section>
          {editSite ? <><MiniPanel /></> : null}
        </div>
      </div >
    </div >
  )
}

function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`flex px-1 py-1 -mr-2 cursor-pointer`}>
        <div
          className="m-auto flex text-2xl"
          onClick={() => setOpen(!open)}>
          <Icon className="m-auto" tag={'menu'} />
        </div>
      </div>

      {open ?
        <Menu__Overlay>

          <Link href="/" className="shadow border border-stone-400 w-24 h-24 flex flex-col justify-center items-center bg-slate-700 border-stone-100 text-center">
            <Icon className="block text-2xl" tag="home" />
            <div className='text-xs'>На главную</div>
          </Link>

          <Link href="/profile" className="shadow border border-stone-400 w-24 h-24 flex flex-col justify-center items-center bg-slate-700 border-stone-100 text-center">
            <Icon className="block text-2xl" tag="person" />
            <div className='text-xs'>Профиль</div>
          </Link>

        </Menu__Overlay>
        : null}
    </>
  )
}

export function Menu__Overlay(props: any) {

  return (
    <motion.div
      animate={{
        opacity: 1
      }}
      style={{ zIndex: 99999 }}
      className='fixed top-8 left-0 right-0 bottom-0 flex opacity-0'>
      <div className="fixed top-8 left-0 right-0 bottom-0 bg-stone-100 opacity-70"></div>
      <div style={{ zIndex: 99999 }} className="m-auto relative grid grid-cols-2 gap-1">
        {props.children}
      </div>
    </motion.div>
  )
}