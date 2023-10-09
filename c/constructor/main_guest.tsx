"use client"

import { useStore } from '@/store/store';
import { LayerMoveable } from './layer_moveable';

export default function MainGuest<ReactNode>() {
  const layers = useStore((state: any) => state.layers)
  const CS = useStore((state: any) => state.constructor_size)

  return (
    <div className='h-screen overflow-hidden container mx-auto' style={{ maxWidth: '900px' }}>
      <div className="flex">
        <section className="w-7/12 bg-stone-100 h-screen overflow-y-scroll scrollbar">
          <div
            className="m-auto relative my-5 pb-10 w-fit">

            {
              Object.values(layers).map((layer: any, ind: Number) => {
                return <LayerMoveable key={ind} data={layer} />
              })
            }

          </div>
        </section>
      </div >
    </div >
  )
}