"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/src/c/ui/icon";
import useStore from "@/src/store/store";
import { useSession } from 'next-auth/react'
import Image from 'next/image';


export function Disk(params: any) {
  const [disk, setDisk] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [path, setPath] = useState(['app:']);

  const goUP = () => {
    path.pop()
    setPath([...path])
  }

  const changePath = (p: string) => {
    path.push(p)
    setPath([...path])
  }

  useEffect(() => {
    setLoading(true)

    axios.post('/api/yadisk', {
      options: {
        path: path.length > 1 ? path.join('/') : path[0] + '/'
      }
    })
      .then(result => {
        setDisk(result.data.res._embedded.items || []);
        setLoading(false)
      })
      .catch(error =>
        setError(true)
      )
  }, [path])

  if (loading) {
    return (
      <div className="">
        {error ?
          <div className="rounded p-2 h-fit bg-stone-100 text-slate-700 border-l-4 border-amber-500">
            <div className="text-lg text-red-500">Ошибка подключения</div>
            <div className="text-sm">Убедитесь, что подключили Яндекс.Диск в <Link className="text-blue-700 underline" href="/profile/person">настройках профиля.</Link></div>
          </div>
          :
          <div className="text-stone-400 text-center">Загрузка...</div>
        }
      </div>
    )
  }

  return (
    <>
      {path.length > 1 ?
        <div onClick={goUP} className="mb-3 text-center bg-stone-300 hover:bg-stone-400 transition-all cursor-pointer text-sm text-stone-700 rounded py-1">
          назад
        </div>
        : null}

      {disk && disk.length > 0 ?
        <div className="grid grid-cols-3 gap-1">
          {
            disk.map((item: object, index: number) => {
              return (
                <Disk__Item
                  onClickAction={changePath}
                  key={index}
                  item={item}
                  closeAction={params.closeAction} />)
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

function Disk__Item({ item, closeAction, onClickAction }: any) {
  const addLayer = useStore((state: any) => state.addLayer)
  const [imageData, setImageData] = useState(null);
  const { data: session } = useSession()
  const name = item.name.split('.')
  const ext = name.length > 1 ? name.pop() : name

  const changeImage = (e: any) => {
    addLayer('image', item.path)
    closeAction(false)
  }

  useEffect(() => {
    if (item.type === 'file') {
      try {
        axios.get(`/api/yadisk?path=${item.path}&author=${session?.user?.email}&size=5`)
          .then(result => {
            setImageData(result.data || '');
          })
      } catch (error) {
        console.log(error);

      }
    }
  }, [])

  return (
    <div className="mb-3 relative border w-full hover:border-amber-500 aspect-square text-center cursor-pointer hover:text-amber-500 transition-all">

      {
        item.type === 'dir' ?

          <div
            onClick={() => onClickAction(item.name)}
            className="w-full h-full flex">
            <Icon className="text-4xl block m-auto" tag={'folder'} />
          </div>

          :

          <>
            <div className="absolute top-0 right-0"><Badge ext={ext} /></div>
            {imageData ?
              <Image
                src={imageData || ''}
                fill={true}
                objectFit="cover"
                alt="miniw3b" /> : null}
            <div
              className="relative w-full h-full z-10"
              onClick={changeImage} />
          </>
      }
      <span className="overflow-hidden absolute -bottom-2 border whitespace-nowrap rounded w-11/12 left-1 text-xs text-center bg-stone-100 text-slate-700 z-10">
        {name}
      </span>
    </div>
  )
}

function Badge(params: any) {
  let bg = 'bg-sky-700';
  let color = 'text-white';
  switch (params.ext) {
    case 'png':
      bg = 'bg-lime-700'
      break;

    case 'gif':
      bg = 'bg-amber-700'
      break;

    default:
      break;
  }

  return <div className={`text-xs px-1 ${bg} ${color}`}>{params.ext}</div>
}