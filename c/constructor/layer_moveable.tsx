import { useStore } from "@/store/store"
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable"
import { LayerComponent } from "../profile/minisites/client"


export function LayerMoveable(params: any) {
  const { id, layerType, title, style } = params.data
  const fixed = useStore((state: any) => state.updateLayer)
  const activeLayer = useStore((state: any) => state.activeLayer)
  const L = useStore((state: any) => state.layers[activeLayer])

  const fixedStyle = () => {
    const c = document.getElementById(id)?.style
    if (c) {
      fixed({
        ...L, style: {
          ...L.style,
          transform: c.transform,
          width: c.width,
          height: c.height,
          backgroundColor: c.backgroundColor
        }
      })
    }
  }

  return (
    <>
      <LayerComponent
        edit={params.edit}
        data={params.data}
        author={params.author} />
      {activeLayer === id &&
        <Moveable
          key={new Date().getTime()} // Ключ для синхронизации изменений
          target={params.edit ? '.tm' : ''}

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
        />
      }
    </>
  )

}