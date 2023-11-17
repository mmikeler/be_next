import { General__Widget } from "./site_options";
import useStore from "@/store/store";

export function General__Style() {
  const style = useStore((state: any) => state.mainlayer)
  const fonts = useStore((state: any) => state.fonts)
  const upd = useStore((state: any) => state.updateStoreProp)

  const fixed = (e: any) => {
    upd(
      'mainlayer',
      { ...style, [e.target.name]: e.target.value }
    )
  }

  const change = (e: any) => {
    const ml = document.getElementById('mainlayer')
    if (ml) { ml.style[e.target.name] = e.target.value }
  }

  return (
    <General__Widget title="Стиль">
      <div className="grid grid-cols-2 gap-2 text-xs mt-4">

        <div>
          <div className="mb-1 flex justify-between">
            <span>Цвет фона</span>
            <span>{style.backgroundColor}</span>
          </div>
          <label
            htmlFor="general_bgc"
            className="h-7 block rounded cursor-pointer"
            style={{ backgroundColor: style.backgroundColor }}>
          </label>
          <input
            onBlur={fixed}
            onChange={change}
            type="color"
            name="backgroundColor"
            className="rounded w-full absolute -z-10 opacity-0"
            defaultValue={style.backgroundColor}
            id="general_bgc" />
        </div>

        <label className="">
          <div className="mb-1">Шрифт</div>
          <select
            onChange={fixed}
            name="fontClass"
            className="px-1 bg-stone-100 text-slate-700 p-1 disabled:opacity-50 w-full"
            value={style.fontClass}>
            <option value={''}>По-умолчанию</option>
            {
              Object.values(fonts).map((font: any, ind: number) => {
                return font && <option key={ind} value={font.set.className}>{font.title}</option>
              })
            }
          </select>
        </label>
      </div>
    </General__Widget>
  )
}