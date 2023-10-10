import { Font } from '@/c/constructor/font_lib';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import axios from 'axios';

export const useStore = create(devtools((set: any, get: any, api) => ({
  /* 
  Размер поля конструктора
  */
  constructor_size: { width: 360, height: 800 },
  /*
  Update root prop
  */
  updateStoreProp: (propName: string, propValue: any) => {
    set(() => ({ [propName]: propValue }), false, 'store/update prop')
    save(get())
  },
  /*
  Layer collection
  */
  layers: {},
  /* 
  Active layer 
  */
  activeLayer: null,
  /*
  ADD layer
  */
  addLayer: (layerType: string, src: string | null) => {
    let ls = get().layers
    let l = createLayer(layerType, Object.keys(get().layers).length, src)
    ls[l.id] = l
    set(() => ({ layers: { ...ls } }), false, 'store/add layer')
  },
  /* 
  Update layer changes
  */
  updateLayer: (layer: { id: string }) => {
    set(() => ({ layers: { ...get().layers, [layer.id]: layer } }), false, 'store/update layer')
    save(get())
  },
  /*
  Delete layer
  */
  deleteLayer: () => {
    const layers = get().layers
    delete layers[get().activeLayer]
    set(() => ({ layers: { ...layers }, activeLayer: null }), false, 'store/deleteLayer')
    save(get())
  },
  /**
   * Fonts
   */
  fonts: {},
  addFont: (font: Font) => {
    set(() => ({ fonts: { ...get().fonts, [font.title.toLowerCase()]: font } }), false, 'store/AddFont')
  },
  removeFont: (font: Font) => {
    set(() => ({ fonts: { ...get().fonts, [font.title.toLowerCase()]: null } }), false, 'store/removeFont')
  },
  isFontChecked: (font: Font) => {
    return get().fonts[font.title.toLowerCase()] ? true : false
  }
})))

function createLayer(layerType: string, num: number, src: string | null) {
  const scrollY = document.getElementById('mw__constructor')?.scrollTop
  let layer = {
    layerType: layerType,
    id: new Date().getTime(),
    title: 'Слой ' + num,
    innerText: 'Ваш текст',
    src: '',
    link: { href: '' },
    style: {
      position: 'absolute',
      top: scrollY ? (scrollY + 400) + 'px' : 0,
      width: '100px',
      height: '100px',
      backgroundColor: '#cccccc',
      borderRadius: '0px',
      borderColor: '#333333',
      borderWidth: '0px',
      borderStyle: 'solid',
      zIndex: 0,
      transform: '',
      overflow: 'hidden',
      padding: '0px',
      color: '#333333',
      fontSize: '16px',
      fontStyle: 'regular',
      textAlign: 'center',
      letterSpacing: '0px',
      lineHeight: 1.2,
    }
  }

  if (layerType === 'text') {
    layer = {
      ...layer, style: {
        ...layer.style,
        backgroundColor: 'transparent',
        width: '360px',
        height: 'auto',
        padding: '10px',
        color: '#333333',
        fontSize: '16px',
        fontStyle: 'regular',
        textAlign: 'center',
        letterSpacing: '0px',
        lineHeight: 1.2,
      }
    }
  }

  if (layerType === 'image') {
    layer = {
      ...layer, src: src || '',
      style: {
        ...layer.style,
        backgroundColor: 'transparent'
      }
    }
  }

  return layer
}

async function save(data: any) {
  try {
    if (localStorage.getItem('constructor') === '1') {
      axios.patch('/api/minisites', {
        id: Number(data.siteid),
        options: {
          content: JSON.stringify(data)
        }
      })
    }
  } catch (error) {
    console.log(error);

  }
}