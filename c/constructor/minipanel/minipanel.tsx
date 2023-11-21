import useStore from "@/store/store"
import { createContext } from "react"
import { motion } from "framer-motion"
import { Minipanel__Single } from "./minipanel_single"
import { Minipanel__Group } from "./minipanel_group"


export const MinipanelContext = createContext(null)

export function MiniPanel() {
  const activeLayers = useStore((state: any) => state.activeLayers)
  let layer = useStore((state: any) => state.findLayer(activeLayers[0]))

  if (activeLayers.length == 0 || !layer) return null

  return (
    <MinipanelContext.Provider value={layer}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, top: 'calc(100dvh - 64px)' }}
        style={{
          width: '340px',
          height: '32px',
          left: 'calc(50% - 172px)',
          top: 'calc(100dvh + 32px)',
          zIndex: 9999
        }}
        className="absolute bg-slate-700 flex items-center justify-center px-1">

        {layer?.items || activeLayers.length > 1 ? <Minipanel__Group /> : null}

        {!layer.items && activeLayers.length == 1 ? <Minipanel__Single /> : null}

      </motion.div>
    </MinipanelContext.Provider>
  )
}