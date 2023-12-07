import { MS_Image } from "@/src/c/ui/ms_image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import useStore from "@/src/store/store"
import { sanitizeHTML } from "@/src/c/profile/minisites/client"
import { Editor } from "../fields/texteditor/text_editor"

export function Layers(props: any) {

  const list: any = []

  function res(items: any, path: string) {
    Object.values(items).map((layer: any, ind: number) => {
      const p = path + '.' + layer.id
      if (layer?.items) {
        return res(layer.items, path.length > 0 ? p : layer.id)
      }
      else {
        list.push(
          <LayerComponent
            key={p}
            path={p}
            edit={props.editSite}
            data={layer}
            author={props.author} />
        )
      }
    })
  }
  res(props.layers, '')

  return list
}

export function LayerComponent(props: any) {
  const layer = props.data
  const author: string = props.author
  const isLayerActive = useStore((state: any) => state.isLayerActive_(props.path))
  const action = useStore((state: any) => state.updateLayer)
  const [edit, setEdit] = useState(false);
  const code: any = useRef()
  // Subscribe
  const activeLayers = useStore((state: any) => state.activeLayers)

  const focus = (e: any) => {
    setEdit(true)
  }

  const saveChange = (e: any) => {
    setEdit(false)
    action({
      ...layer,
      innerText: sanitizeHTML(e.target.innerHTML)
    })
  }

  useEffect(() => {
    // Корректируем размер фрейма в соответствии с размерами слоя
    code.current &&
      code.current.querySelectorAll('iframe').forEach((f: any) => {
        f.width = layer.style.width
        f.height = layer.style.height
      })
  })

  return (
    <>
      <Wrapper
        layer={layer}
        edit={props.edit}
        focus={focus}
        setEdit={setEdit}
        isLayerActive={isLayerActive}>

        {layer.layerType === 'text' ?
          <div
            onClick={focus}
            className={`relative h-full ${layer.fontClass || ''}`}
            onBlur={props.edit ? saveChange : () => { return }}
            contentEditable={(isLayerActive && props.edit && edit) ? true : false}
            dangerouslySetInnerHTML={{ __html: layer.innerText }}>
          </div>
          : null}

        {layer.layerType === 'texteditor' ?
          <Editor {...props} />
          : null}

        {layer.layerType === 'code' ?
          <div ref={code} className={`h-full ${props.edit ? `relative overlay` : ''}`}
            dangerouslySetInnerHTML={{ __html: layer.innerHTML }}>
          </div>
          : null}

        {layer.layerType === 'image' ?
          <MS_Image className="w-full" path={layer.src} author={author} />
          : null}
      </Wrapper>
    </>
  )
}

function Wrapper(params: any) {
  const { layer, edit, isLayerActive } = params
  const upd = useStore((state: any) => state.updateStoreProp)

  const changeLayer = () => {
    edit && upd('activeLayers', [layer.id])
  }

  if (layer.link?.href.length > 0 && !params.edit) {
    return (
      <Link
        onClick={changeLayer}
        id={layer.id}
        style={layer.style}
        target="_blank"
        className={`cursor-pointer${isLayerActive ? ' lm' : ''}`}
        href={layer.link.href || ''}>
        {params.children}
      </Link>
    )
  }
  else {
    return (
      <div
        onClick={changeLayer}
        id={layer.id}
        style={layer.style}
        className={`${isLayerActive ? ' lm' : ''} ${params.edit ? 'cursor-move' : null}`}>
        {params.children}
      </div>
    )
  }
}