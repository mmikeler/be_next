import { useEffect, useState } from "react"
import { MiniPanel__Link, Minipanel__Border, Minipanel__Effects, Minipanel__HTML, Minipanel__Size, Minipanel__Text } from "./fields"
import { motion } from "framer-motion"
import { Icon } from "@/src/c/ui/icon"

export function Minipanel__Subpanel(props: any) {
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
      id="minipanel-subpanel"
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