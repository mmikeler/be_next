"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/legacy/image'
import { Icon } from "@/c/ui/icon";
import { useStore } from "@/store/store";


export function Disk(params: any) {
  const [disk, setDisk] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    try {
      axios.post('/api/yadisk', {
        options: {
          path: 'app:/'
        }
      })
        .then(result => {
          setDisk(result.data.res._embedded.items || []);
          setLoading(false)
        })
    } catch (error) {
      //
    }

  }, [])

  if (loading) {
    return (
      <div className="flex text-stone-400 text-center h-full">
        Загрузка...
      </div>
    )
  }

  return (
    <>
      {disk && disk.length > 0 ?
        <div className="columns-3">
          {
            disk.map((item: object, index: number) => {
              return <Disk__Item key={index} item={item} closeAction={params.closeAction} />
            })
          }
        </div>
        :
        <div className="flex text-stone-400 text-center h-full">
          <p className="m-auto">
            Пока здесь пусто. Добавьте файлы через <Link className="underline" href={'https://disk.yandex.ru/client/disk/Приложения'}>веб-интерфейс</Link> Яндекс.Диска, а затем возвращайтесь сюда.
          </p>
        </div>
      }
    </>
  )
}

function Disk__Item({ item, closeAction }: any) {
  const addLayer = useStore((state: any) => state.addLayer)

  const changeImage = (e: any) => {
    addLayer('image', item.path)
    closeAction(false)
  }

  return (
    <div className="text-center cursor-pointer hover:text-amber-500 transition-all">
      {
        item.type === 'dir' ?

          <>
            <Icon className="text-6xl" tag={'folder'} />
          </>

          :

          <>
            <img
              className="border hover:border-amber-500 rounded"
              onClick={changeImage}
              loading="lazy"
              src={item.preview}
              width={'100'}
              height={'100'}
              alt={'miniweb'} />
          </>
      }
      <span className="relative text-xs w-full -top-3">{item.name}</span>
    </div>
  )
}