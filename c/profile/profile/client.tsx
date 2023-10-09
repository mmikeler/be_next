"use client"

import { Icon } from "@/c/ui/icon";
import { useState } from "react";
import axios from "axios";

export function Person__Widget(props: any) {
  const { title, tag }: { title: string, tag: string } = props
  return (
    <div className="person__widget bg-stone-100 text-slate-600 rounded border border-stone-200 shadow">
      <div className="text-2xl px-4 pt-5 flex items-center">
        <Icon className="me-2 text-4xl" tag={tag} />
        {title}
      </div>
      <div className="mt-4 p-4">
        {props.children}
      </div>
    </div>
  )
}

export function YaDiskConnectionWidget({ token }: { token: string | null | undefined }) {
  const [loaded, setLoaded] = useState(false);
  const [openDisk, setOpenDisk] = useState(token ?? false);

  const getKey = () => {
    window.open(
      `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.NEXT_PUBLIC_YADISK_CLIENT_ID}`,
      "Miniweb.Disk",
      'width=800,height=400');
  }

  const changeKey = (e: any) => {
    setLoaded(true)
    axios.patch('/api/user', {
      options: {
        ya_disk: e.target.value
      }
    }).then(res => {
      if (res.statusText === 'OK') {
        setOpenDisk(true)
      }
      setLoaded(false)
    })
  }

  if (openDisk) {
    return <div className="text-lime-700">Диск успешно подключен!</div>
  }

  return (
    <>
      <div>
        <p>Подключив свой Яндекс.Диск вы сможете без ограничений использовать изображения на своих сайтах.</p>
        <p className="text-amber-700 my-4">
          Получите ключ <b className="text-lime-500 cursor-pointer" onClick={getKey}>ЗДЕСЬ</b> и вставьте его в форму ниже.
        </p>

        {loaded ?
          <span>Сохраняем...</span>
          :
          <input
            onBlur={changeKey}
            placeholder="Ваш ключ"
            type="text"
            className="p-3 border border-stone-200 rounded text-xs w-full" />}

      </div>
    </>
  )

}