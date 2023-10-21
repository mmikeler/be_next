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
    get().save()
  },
  /*
  Layer collection
  */
  layers: {},
  /*
  Layer collection
  */
  history: [],
  /*
  Layers navigation
  */
  navigation: {},
  /* 
  Active layers 
  */
  activeLayers: [],
  /*
  ADD layer
  */
  addLayer: (layerType: string, src: string | null) => {
    get().setHistory()
    let ls = get().layers
    let l = createLayer(layerType, Object.keys(get().layers).length, src)
    ls[l.id] = l
    set(() => ({ layers: { ...ls } }), false, 'store/add layer')
    get().setNavPoint({ [l.id]: l.id })
  },
  /* 
  Update layer changes
  */
  updateLayer: (layer: { id: string }) => {
    get().setHistory()
    set(() => ({ layers: { ...get().layers, [layer.id]: layer } }), false, 'store/update layer')
    get().save()
  },
  /* 
  Multyple layers updates
  */
  updateLayers: (layersCollection: [{
    id: string,
    newstyle: {
      transform: string,
      width: string,
      height: string,
      backgroundColor: string
    }
  }]) => {
    get().setHistory()
    layersCollection.map((data) => {
      let l = { ...get().layers[data.id] }
      l.style = {
        ...l.style,
        transform: data.newstyle.transform,
        width: data.newstyle.width,
        height: data.newstyle.height,
        backgroundColor: data.newstyle.backgroundColor
      }
      set(() => ({
        layers: { ...get().layers, [data.id]: l }
      }), false, 'store/update layer')
    })
    get().save()
  },
  /*
  Delete layer
  */
  deleteLayer: () => {
    let layers = get().layers
    get().setHistory()
    delete layers[get().activeLayers[0]]
    set(() => ({ layers: { ...layers }, activeLayers: [] }), false, 'store/deleteLayer')
    get().save()
  },
  /*
  Group active layers
  */
  groupLayers: () => {
    let layers = get().layers
    get().setHistory()
    delete layers[get().activeLayers[0]]
    set(() => ({ layers: { ...layers }, activeLayers: [] }), false, 'store/deleteLayer')
    get().save()
  },
  /**
   * Fonts
   */
  fonts: {},
  addFont: (font: Font) => {
    set(() => ({ fonts: { ...get().fonts, [font.title.toLowerCase()]: font } }), false, 'store/AddFont')
  },
  removeFont: (font: Font) => {
    let tmp = { ...get().fonts }
    delete tmp[font.title.toLowerCase()]
    set(() => ({ fonts: tmp }), false, 'store/removeFont')
  },
  isFontChecked: (font: Font) => {
    return get().fonts[font.title.toLowerCase()] ? true : false
  },
  /**
   * SAVE
   */
  save: async function () {
    try {
      if (localStorage.getItem('constructor') === '1') {
        // Сохраняем в БД
        const saveData = JSON.stringify(get())
        axios.patch('/api/minisites', {
          id: Number(get().siteid),
          options: {
            content: saveData
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * State back
   */
  // Сохраняем в историю изменений
  setHistory: () => {
    set(() => ({
      history: get().history.concat([get().layers])
    }), false, 'store/saveToHistory')
  },
  // Отменяем последние правки
  undo: () => {
    const undo = get().history.pop()
    if (undo) {
      set(() => ({
        layers: undo
      }), false, 'store/recoverPrevState')
      get().save()
    }
  },
  /**
   * Navigation
   */
  setNavPoint: (layersIDs: any | null) => {
    // Сохраняем в историю
    get().setHistory()
    // Определяем слои для обработки
    let layers = {};
    Object.values(layersIDs || get().activeLayers).forEach((l: any) => {
      const id = l as keyof typeof layers;
      layers[id] = id;
    });
    // Получаем навигацию для корректировки
    let prevNav = get().navigation
    // Добавляем как группу
    if (Object.values(layers).length > 1) {
      // Удаляем старые поинты
      prevNav = get().f_a_d(prevNav, layers)
      // Добавляем как группу
      set(() => ({
        navigation: {
          ...prevNav,
          [new Date().getTime()]: {
            title: 'Новая группа',
            items: layers
          }
        }
      }), false, 'store/setNavPoint__Group', layers)
    }
    // Или как сингл
    else {
      set(() => ({
        navigation: {
          ...prevNav, ...layersIDs
        }
      }), false, 'store/setNavPoint__Single')
    }
    // Сохраняем в базе
    get().save()
  },
  /**
   * Find and Delete nav point
   */
  f_a_d: (nav: object, layersIDs: object) => {

    function del(searchID: string, item: string | any, parent: object) {

      if (searchID === item) {
        const key = item as keyof typeof parent;
        delete parent[key]
      }

      if (item?.items) {
        Object.values(item.items).forEach((i: any) => {
          del(searchID, i, item.items)
        })
      }

    }

    Object.values(layersIDs).forEach((id: string) => {
      //console.log(id);

      for (const point in nav) {
        const key = point as keyof typeof nav;
        del(id, nav[key], nav)
      }
    })

    return nav
  },
  /**
   * Group layers
   */
  group: () => {
    get().setNavPoint()
  },
  /**
   * Ingroup layers
   */
  ungroup: () => {

  }
})))

function createLayer(layerType: string, num: number, src: string | null) {
  const scrollY = document.getElementById('mw__constructor')?.scrollTop
  let layer = {
    layerType: layerType,
    id: new Date().getTime(),
    title: 'Слой ' + num,
    innerText: 'Ваш текст',
    innerHTML: '',
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

  if (layerType === 'code') {
    layer = {
      ...layer, innerHTML: '',
      style: {
        ...layer.style,
        backgroundColor: '#cccccc',
        width: '360px'
      }
    }
  }

  return layer
}