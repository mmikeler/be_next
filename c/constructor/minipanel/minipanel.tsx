import useStore from "@/store/store"
import { createContext, useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@/c/ui/icon"
import { Colorpicker } from "../fields"
import { MiniPanel__Link, Minipanel__Border, Minipanel__Effects, Minipanel__HTML, Minipanel__Size, Minipanel__Text } from "./fields"
import { Type_Icon } from "../icons"

export const MinipanelContext = createContext(null)

export function MiniPanel() {
  const activeLayers = useStore((state: any) => state.activeLayers)
  let layer = useStore((state: any) => state.findLayer(activeLayers[0]))

  if (activeLayers.length == 0 || !layer) return null

  return (
    <MinipanelContext.Provider value={layer}>
      <motion.div
        initial={{ opacity: 0, top: 'calc(100vh - 32px)' }}
        animate={{ opacity: 1, top: 'calc(100vh - 64px)' }}
        style={{
          width: '340px',
          height: '32px',
          left: 'calc(50% - 172px)',
          top: 'calc(100vh - 64px)',
          zIndex: 9999
        }}
        className="absolute bg-slate-700 flex items-center justify-center px-1">
        {layer?.items ?
          <Minipanel__Group />
          :
          <>
            <Minipanel__Single />
          </>
        }
      </motion.div>
    </MinipanelContext.Provider>
  )
}

function Minipanel__Group(params: any) {
  const G: any = useContext(MinipanelContext)
  const delete_action = useStore((state: any) => state.deleteLayer_)
  const copy_action = useStore((state: any) => state.copyContent)
  const mod = "mx-1 flex items-center text-stone-300 cursor-pointer hover:text-stone-100 transition-all"

  const deleteLayer = () => {
    delete_action(G.id)
  }

  const copyContent = () => {
    copy_action(G.id)
  }

  return (
    <div className="text-2xl flex items-center">

      <div className="bg-stone-100 h-full" style={{ width: '2px' }}></div>

      <div onClick={copyContent} className={mod} title='Копировать'>
        <Icon tag="content_copy" />
      </div>
      <div onClick={deleteLayer} className={mod} title='Удалить слой'>
        <Icon className="" tag="delete" />
      </div>
    </div>
  )
}

function Minipanel__Single(params: any) {
  const L: any = useContext(MinipanelContext)
  const delete_action = useStore((state: any) => state.deleteLayer_)
  const copy_action = useStore((state: any) => state.copyContent)
  const mod = "mx-1 flex items-center text-stone-300 cursor-pointer hover:text-stone-100 transition-all"
  const [subPanel, setsubPanel] = useState('size');

  const deleteContent = () => {
    delete_action(L.id)
  }

  const copyContent = () => {
    copy_action(L.id)
  }

  return (
    <>
      <Minipanel__Subpanel content={subPanel} />
      <div className="text-2xl flex w-full items-center">

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

        {L.layerType === 'text' ?
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

        {L.layerType === 'code' ?
          <div
            onClick={() => setsubPanel('code')}
            title="Вставка кода"
            className={`${mod} ${subPanel === 'code' ? 'text-lime-400' : ''}`}>
            <Type_Icon type="code" />
          </div>
          : null
        }

        <div className="bg-slate-500 h-6 ms-auto me-1" style={{ width: '2px' }}></div>

        <div onClick={copyContent} className={mod} title='Копировать'>
          <Icon tag="content_copy" />
        </div>
        <div onClick={deleteContent} className={mod} title='Удалить слой'>
          <Icon tag="delete" />
        </div>
      </div>
    </>
  )
}

function Minipanel__Subpanel(props: any) {
  switch (props.content) {
    case 'text':
      return (
        <Minipanel__Subpanel__Wrapper>
          <Minipanel__Text />
        </Minipanel__Subpanel__Wrapper>)

    case 'border':
      return (
        <Minipanel__Subpanel__Wrapper>
          <Minipanel__Border />
        </Minipanel__Subpanel__Wrapper>)

    case 'link':
      return (
        <Minipanel__Subpanel__Wrapper>
          <MiniPanel__Link />
        </Minipanel__Subpanel__Wrapper>)

    case 'code':
      return (
        <Minipanel__Subpanel__Wrapper>
          <Minipanel__HTML />
        </Minipanel__Subpanel__Wrapper>)

    case 'effects':
      return (
        <Minipanel__Subpanel__Wrapper>
          <Minipanel__Effects />
        </Minipanel__Subpanel__Wrapper>)

    default:
      return (
        <Minipanel__Subpanel__Wrapper>
          <Minipanel__Size />
        </Minipanel__Subpanel__Wrapper>)
  }
}

function Minipanel__Subpanel__Wrapper(params: any) {
  const [modElement, setModElement] = useState<any>(null);
  const mod = 'absolute mb-1 w-8 h-8 bottom-0 border-2 border-stone-200 rounded-full bg-slate-700 text-stone-100 flex items-center justify-center text-2xl';

  const m: any = (e: any, index: number) => {
    if (modElement) {
      if (modElement.hasAttribute('step')) {
        const step = Number(modElement.getAttribute('step')) * index;
        modElement.value = Number(modElement.value) + step
      }
      else {
        modElement.value = Number(modElement.value) + index
      }
      modElement.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('.minipanel-subpanel input[type=number]')
    inputs.forEach((input: any) => {
      input.onfocus = (e: any) => { setModElement(e.target) }
    })

    function close(e: any) {
      console.log(e.target.closest('.minipanel-subpanel'));

      if (e.target.closest('.minipanel-subpanel') == null && !e.target.closest('.ext-mod')) {
        setModElement(null)
      }
    }
    document.addEventListener('click', close)

    return () => {
      document.removeEventListener('click', close)
    }
  }, [params.children, modElement])

  return (
    <div
      className="minipanel-subpanel cursor-pointer text-sm text-slate-700 absolute bottom-full left-0 w-full py-2 border border-slate-300 bg-white flex items-center px-1 rounded-t-md">
      {modElement ?
        <>
          <motion.div
            onClick={(e) => m(e, -1)}
            animate={{ bottom: '100%', zIndex: 9999 }}
            className={`ext-mod ${mod} left-0`}><Icon tag="remove" /></motion.div>
          <motion.div
            onClick={(e) => m(e, 1)}
            animate={{ bottom: '100%', zIndex: 9999 }}
            className={`ext-mod ${mod} right-0`}><Icon tag="add" /></motion.div>
        </>
        : null}
      {params.children}
    </div>
  )
}