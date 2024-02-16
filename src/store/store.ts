import { Font } from '@/src/c/constructor/font_lib';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { random } from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';
const _ = require('lodash');

export default create(
  devtools((set: any, get: any) => ({
    /*
    Размер поля конструктора
    */
    constructor_size: { width: 360, height: 800 },
    /**
     * Дополнительные инструменты и переменные
     */
    tools: {
      groupSelected: false
    },
    /*
    Update root prop
    */
    updateStoreProp: (propName: string, propValue: any) => {
      set(() => ({ [propName]: propValue }), false, 'store/update root prop');
      if (propName != 'activeLayers') {
        get().save();
      }
    },
    /*
    Layer collection
    */
    mainlayer: {
      backgroundColor: '#f3f3f3',
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
    Active layers
    */
    activeLayers: [],
    /*
    ADD layer
    */
    addLayer: (layerType: string, src: string | null) => {
      get().setHistory();
      let ls = get().layers;
      let l = createLayer(layerType, Object.keys(get().layers).length, src);
      ls[l.id] = l;
      set(() => ({ layers: { ...ls } }), false, 'store/add layer');
    },
    /*
    Update layer changes
    */
    updateLayer: (layer: { id: string; }) => {
      get().setHistory();
      set(() => ({ layers: { ...get().layers, [layer.id]: layer } }), false, 'store/update layer');
      get().save();
    },
    /*
    Multyple layers updates
    */
    updateLayers: (layersCollection: [{
      id: string;
      newstyle: {
        transform: string;
        width: string;
        height: string;
        backgroundColor: string;
      };
    }]) => {
      get().setHistory();
      layersCollection.map((data) => {
        let l = { ...get().layers[data.id] };
        l.style = {
          ...l.style,
          transform: data.newstyle.transform,
          width: data.newstyle.width,
          height: data.newstyle.height,
          backgroundColor: data.newstyle.backgroundColor
        };
        set(() => ({
          layers: { ...get().layers, [data.id]: l }
        }), false, 'store/update layer');
      });
      get().save();
    },
    /**
     * is layer active
     */
    isLayerActive: (id: string) => {
      const a = get().activeLayers.includes(id.toString());
      const b = get().activeLayers.includes(get().findLayerParent(id.toString()));
      //console.log(id, n, m, parentID);
      if (a || b) {
        return true;
      }
      else {
        return false;
      }
    },
    /**
     * Is parent active
     */
    isLayerActive_: (path: string) => {
      const overlap = get().activeLayers.filter((i: any) => path.split('.').includes(i))
      return overlap.length > 0 ? true : false
    },
    /*
    Delete layer
    */
    deleteLayer: () => {
      let layers = get().layers;
      get().setHistory();
      delete layers[get().activeLayers[0]];
      set(() => ({ layers: { ...layers }, activeLayers: [] }), false, 'store/deleteLayer');
      get().save();
    },
    /*
    Group active layers
    */
    groupLayers: () => {
      let layers = get().layers;
      get().setHistory();
      delete layers[get().activeLayers[0]];
      set(() => ({ layers: { ...layers }, activeLayers: [] }), false, 'store/groupLayer');
      get().save();
    },
    /**
     * Meta data
     */
    meta: {},
    /**
     * update meta
     * @param metaName
     * @param metaValue
     * @returns  
     */
    updateMeta: (metaName: string, metaValue: string) => {
      set(() => ({ meta: { ...get().meta, [metaName]: metaValue } }))
      get().save();
    },
    /**
     * Fonts
     */
    fonts: {
      google: {},
      local: {}
    },
    addFont: (font: Font, fontDir: string = 'google') => {
      set(() => ({
        fonts: {
          ...get().fonts,
          [fontDir]: {
            ...get().fonts[fontDir], [font.title.toLowerCase()]: font
          }
        }
      }), false, 'store/AddFont');
      get().save();
    },
    removeFont: (font: Font, fontDir: string = 'google') => {
      let tmp = { ...get().fonts };
      delete tmp[fontDir][font.title.toLowerCase()];
      set(() => ({ fonts: tmp }), false, 'store/removeFont');
      get().save();
    },
    isFontChecked: (font: Font, fontDir: string = 'google') => {
      if (get().fonts[fontDir]) {
        return get().fonts[fontDir][font.title.toLowerCase()] ? true : false;
      }
    },
    /**
     * SAVE
     */
    save: async function () {

      // Сохраняем в БД
      async function saveData() {
        if (localStorage.getItem('constructor') === '1') {

          let layers = _.cloneDeep(get().layers);
          for (let layer in layers) {
            layers[layer].node = null;
          }

          const res = await axios.patch('/api/minisites', {
            id: Number(get().siteid),
            options: {
              content: JSON.stringify({
                id: get().id,
                constructor_size: get().constructor_size,
                fonts: get().fonts,
                mainlayer: get().mainlayer,
                layers: layers,
                meta: get().meta
              }),
              modify: new Date()
            }
          });
          return res;
        }
        return false;
      }

      try {
        await saveData();
      } catch (error) {
        console.log(error);

        toast.promise(
          saveData(),
          {
            pending: 'Ошибка сохранения данных. Пробуем ещё раз.',
            success: 'Всё в порядке. Можно продолжать.',
            error: 'Не удалось. Попробуйте обновить страницу.'
          }
        )
      }
    },
    /**
     * State back
     */
    // Сохраняем в историю изменений
    setHistory: () => {
      set(() => ({
        history: get().history.concat({ ...get().layers })
      }), false, 'store/saveToHistory');
    },
    // Отменяем последние правки
    undo: () => {
      const h = [...get().history];
      const undo = h.pop();
      if (undo) {
        set(() => ({
          layers: undo,
          history: h
        }), false, 'store/recoverPrevState');
        get().save();
      }
    },
    /**
     * Find layer
     */
    findLayer: (id: string) => {
      // Функция поиска для рекурсии
      function f(searchID: string, parent: any) {
        for (const item in parent) {
          const key = item as keyof typeof value;
          const value: any = parent[key];
          if (searchID == item) {
            return value;
          }
          if (value?.items) {
            let res: any = f(searchID, value.items)
            if (res) return res
          }
        }
      }
      return f(id, get().layers);
    },
    /**
     * Update layer
     */
    updateLayer_: (id: string, newdata: object) => {
      get().setHistory();
      let layers = _.cloneDeep(get().layers);
      // Функция поиска для рекурсии
      function f(searchID: string, parent: any) {
        for (const item in parent) {
          const key = item as keyof typeof value;
          const value: any = parent[key];
          if (searchID == item) {
            parent[key] = _.cloneDeep(newdata);
          }
          if (value?.items) {
            f(searchID, value.items);
          }
        }
      }
      f(id, layers);
      set(() => ({ layers: layers }), false, 'store/updateLayer_');
      get().save();
    },
    /**
     * Copy content
     */
    copyContent: (id: string) => {
      // Ищем контент
      let content = _.cloneDeep(get().findLayer(id));
      // Если нашли
      if (content) {
        get().setHistory();
        content = get().replace_id(content);
        const layers = { ...get().layers };
        layers[content.id] = content;
        set(() => ({ layers: layers }), false, 'store/copyContent');
        get().save();
      }
      else {
        console.log(id, content);

        return false;
      }
    },
    /**
     * Replace id
     */
    replace_id: (content: object) => {
      // Функция для рекурсии
      function f(data: any) {
        data.id += 'c' + random(0, 10000);
        data.title += ' (copy)';
        if (data?.items) {
          let m: any = {};
          Object.values(data.items).forEach((d: any) => {
            d.id += 'c' + random(0, 10000);
            d.title += ' (copy)';
            m[d.id] = d;
            if (d?.items) {
              f(d);
            }
          });
          data.items = m;
        }
      }
      f(content);
      return content;
    },
    /**
     * Update layers
     */
    updateLayers_: (newdata: object) => {
      get().setHistory();
      const layers = get().layers;
      // Функция поиска для рекурсии
      function f(searchID: string, parent: any, newstyle: any) {
        for (const item in parent) {
          const key = item as keyof typeof value;
          const value: any = parent[key];
          if (searchID == item) {

            if (!newstyle) {
              delete parent[key];
            }
            else {
              parent[key] = {
                ...parent[key],
                style: {
                  ...parent[key].style,
                  transform: newstyle.transform,
                  width: newstyle.width,
                  height: newstyle.height,
                  backgroundColor: newstyle.backgroundColor
                }
              };
            }
          }
          if (value?.items) {
            f(searchID, value.items, newstyle);
          }
        }
      }
      Object.values(newdata).forEach((nd: any) => {
        f(nd.id, get().layers, nd.newstyle);
      });
      set(() => ({ layers: layers }), false, 'store/updateLayers_');
      get().save();
    },
    /**
     * Find layer parent group
     */
    findLayerParent: (id: string) => {
      // Функция поиска для рекурсии
      function f(searchID: string, parent: any, parentID: string) {
        for (const item in parent) {
          const key = item as keyof typeof value;
          const value: any = parent[key];
          if (searchID == item) {
            return parentID;
          }
          if (value?.items) {
            let res: any = f(searchID, value.items, item)
            if (res) return res
          }
        }
      }
      return f(id, get().layers, '');
    },
    /**
     * Delete layer
     */
    deleteLayer_: (id: string) => {
      get().setHistory();
      const layers = get().layers;
      set(() => ({
        layers: { ...get().del(layers, id) },
        activeLayers: []
      }), false, 'store/deleteLayer_');
      get().save();
    },
    /**
     * Group layers
     */
    group: () => {
      get().setHistory();
      let layers = get().layers;
      let group: any = {};
      get().activeLayers.forEach((id: string) => {
        group[id] = get().findLayer(id);
        layers = get().del(layers, id);
      });
      // Сохраняем
      const group_id = new Date().getTime().toString();
      set(() => ({
        layers: {
          ...layers, [group_id]: {
            id: group_id,
            title: 'Новая группа',
            items: group
          }
        }
      }), false, 'store/group');
      get().save();
    },
    /**
     * Ingroup layers
     */
    ungroup: () => {
    },
    /**
     * Функция удаления для рекурсии
     */
    del: (layers: object, searchID: string) => {

      for (let item in layers) {
        const key = item as keyof typeof layers;
        const value: any = layers[key];
        // Если конец пути (строка) удаляем
        if (searchID == item) {
          delete layers[key];
        }
        // Если нет (объект) запускаем снова
        if (value?.items) {
          if (Object.values(value.items).length > 0) {
            Object.values(value.items).forEach((i: any) => {
              return get().del(value.items, searchID);
            });
          }
          // Если группа остаётся пустой, удаляем
          if (Object.values(value.items).length == 0) {
            delete layers[key];
          }
        }
      }
      return layers;
    }
  })
  )
);

function createLayer(layerType: string, num: number, src: string | null) {
  const scrollY = document.getElementById('mw__constructor')?.scrollTop;
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  let layer = {
    layerType: layerType,
    id: new Date().getTime().toString(),
    title: 'Слой ' + num,
    innerText: 'Ваш текст',
    innerHTML: '',
    src: '',
    link: { href: '' },
    timer: {
      date: moment(d.getTime()).format("YYYY-MM-DD"), // Дата конца отсчёта
      time: '1', // Время в день конца отсчёта
      delimeter: ':', // Разделитель
      parts: { // Переключатели дизайна
        days: true, // Показывать дни
        hours: true, // Показывать часы
        minutes: true, // Показывать минуты
        seconds: true, // Показывать секунды
        text: true // Показывать подписи
      },
      endText: 'Уже идёт!'
    },
    style: {
      position: 'absolute',
      top: scrollY ? (scrollY + 400) + 'px' : 0,
      width: '105px',
      height: '105px',
      backgroundColor: '#cccccc',
      borderRadius: '0px',
      borderColor: '#333333',
      borderWidth: '0px',
      borderStyle: 'solid',
      zIndex: 50,
      transform: '',
      overflow: 'hidden',
      padding: '0px',
      color: '#333333',
      fontSize: '16px',
      fontStyle: 'regular',
      textAlign: 'center',
      letterSpacing: '0px',
      lineHeight: 1.2,
      opacity: 1
    }
  }

  if (layerType === 'text') {
    layer = {
      ...layer, style: {
        ...layer.style,
        backgroundColor: 'transparent',
        width: '360px',
        height: 'auto',
        padding: '15px',
        color: '#333333',
        fontSize: '16px',
        fontStyle: 'regular',
        textAlign: 'center',
        letterSpacing: '0px',
        lineHeight: 1.2,
      }
    }
  }

  if (layerType === 'texteditor') {
    layer = {
      ...layer, style: {
        ...layer.style,
        backgroundColor: 'transparent',
        width: '360px',
        height: 'auto',
        padding: '0',
        color: '#333333',
        fontSize: '14px',
        fontStyle: 'regular',
        textAlign: 'left',
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

  if (layerType === 'module_timer') {
    layer = {
      ...layer,
      style: {
        ...layer.style,
        backgroundColor: 'transparent',
        width: '360px',
        height: '60px',
        textAlign: 'center',
      }
    }
  }

  return layer
}