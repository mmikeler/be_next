import { Icon } from "../ui/icon";
import { useStore } from "@/store/store";
import { Gallery } from "./gallery/gallery";
import { Type_Icon } from "./icons";


export function CreateLayerWidget() {
  const addLayer = useStore((state: any) => state.addLayer)

  return (
    <div className="flex items-center w-fit text-2xl">
      <div onClick={() => addLayer('block')} className="m-1 flex hover:text-lime-500 transition-all cursor-pointer">
        <Type_Icon type="block" />
      </div>
      <div onClick={() => addLayer('text')} className="m-1 flex hover:text-lime-500 transition-all cursor-pointer">
        <Type_Icon type="text" />
      </div>
      <Gallery />
    </div>
  )
}