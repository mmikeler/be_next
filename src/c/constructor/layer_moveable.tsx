import Moveable, { OnDrag, OnResize, OnRotate } from 'react-moveable';
import useStore from '@/src/store/store';

export function SingleMoveable(params: any) {
  const multyFixed = useStore((state: any) => state.updateLayers_)
  // Subscribe to update
  const layers = useStore((state: any) => state.layers)
  const activeLayers = useStore((state: any) => state.activeLayers)

  const fixedStyle = (e: any) => {
    const update = [{
      id: e.target.id,
      newstyle: e.target.style
    }]
    multyFixed(update)
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
      //
      // Options
      //
      useResizeObserver={true}
      useMutationObserver={true}
      throttleDrag={15}
      throttleResize={15}
      checkInput={true}
      origin={false}
      isDisplayGridGuidelines={true}
      //
      // Drag
      //
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
      //
      // Resize
      //
      resizable={true}
      onResize={({
        target, width, height,
        dist, delta, direction,
        clientX, clientY,
      }: OnResize) => {
        delta[0] && (target!.style.width = `${width}px`);
        delta[1] && (target!.style.height = `${height}px`);
      }}
      //
      // Rotate
      //
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
          ev.delta[0] && (ev.target.style.width = `${ev.width}px`);
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