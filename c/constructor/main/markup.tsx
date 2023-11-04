import { useEffect, useState } from "react"
import useStore from '@/store/store'
import { parseProp } from "@/c/profile/minisites/client"

export function Markup() {
  const cs = useStore((state: any) => state.constructor_size)
  const class_0 = 'absolute top-0 bottom-6 bg-slate-500 opacity-10 mark'
  const style_0 = { width: '1px', zIndex: '999', left: 'calc(100% / 12)' }
  const style_1 = { height: '1px', width: '360px', zIndex: '999', left: 0 }
  const [open, setOpen] = useState(true);

  const marks: any = []
  for (let i = 0; i <= 24; i++) {
    marks.push(
      <div key={i} className={class_0}
        style={{ ...style_0, left: `calc(100% / 24 * ${i})` }}>
      </div>
    )
  }
  for (let i = 0; i <= parseProp(cs.height) / 15 - 1; i++) {
    marks.push(
      <div key={'v' + i} className={class_0}
        style={{ ...style_1, top: `${15 * i}px` }}>
      </div>
    )
  }

  const displayMarks = (event: any) => {
    // use history
    if (event.code === "KeyH"
      && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setOpen(!open)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', displayMarks)
    return () => {
      document.removeEventListener('keydown', displayMarks)
    }
  }, [open])

  return (
    <>
      {open ? marks : null}
    </>
  )
}