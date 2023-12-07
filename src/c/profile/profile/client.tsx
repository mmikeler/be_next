"use client"

import { Icon } from "@/src/c/ui/icon";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Main__Header from "../main_header";
import { useRouter } from "next/navigation";
import { UserCtx } from "../profile";

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

export function YaDiskConnectionWidget() {
  const user: any = useContext(UserCtx)
  const [loaded, setLoaded] = useState(false);
  const [openDisk, setOpenDisk] = useState(false);

  const getKey = () => {
    window.open(
      `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.NEXT_PUBLIC_YADISK_CLIENT_ID}`,
      "Miniw3b.Disk",
      'width=360,height=400');
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

  useEffect(() => {
    setOpenDisk(user?.ya_disk)
  }, [user])

  if (openDisk === false) {
    return <div className="text-italic">Проверка...</div>
  }

  if (openDisk) {
    return <div className="text-lime-700">Диск успешно подключен!</div>
  }

  if (openDisk === null || openDisk) {
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
}

export function Pay__End(params: any) {
  const [id, setId] = useState<string>('');
  const [pay, setPay] = useState<any>(null);
  const { push } = useRouter()

  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get('id')
    setId(id || '')
  }, [])

  useEffect(() => {
    if (id.length > 0) {
      axios.get('/api/pay?id=' + id)
        .then((res: any) => {
          if (res.error) {
            alert('Непредвиденная ошибка. Свяжитесь с администратором.')
          }
          else {
            setPay(res.data)
          }
        })
    }
  }, [id])

  useEffect(() => {
    let t: any;
    if (pay) {
      t = setTimeout(() => {
        push('/profile/points')
      }, 3000)
    }
    return () => clearTimeout(t)
  }, [pay, push])

  return (
    <>
      <Main__Header title="Завершение платежа" />
      <div
        style={{
          background: "url('/assets/bg2.jpg') no-repeat center / cover",
          maxWidth: '500px'
        }}
        className="flex mx-auto w-80 h-80 text-slate-700 mt-20 p-5 rounded border"
        id="payment-form">
        {pay ?
          <div className="text-center m-auto">
            {pay?.status === 'succeeded' &&
              <div className="text-lg">
                <Icon className="text-4xl text-lime-500" tag="task_alt" />
                <div className="mt-3 text-sm">
                  <div className="text-xl">Спасибо!</div>
                  Счёт пополнен успешно. <br />
                  Сейчас вернёмся назад.
                </div>
              </div>
            }
            {pay?.status === 'canceled' &&
              <div className="text-lg">
                <Icon className="text-4xl text-red-500" tag="warning" />
                <div className="mt-3">
                  Операция отменена. Свяжитесь с администратором сервиса, если это произошло ненамеренно.
                </div>
              </div>
            }
          </div>

          : <div className="text-center m-auto">Проверка...</div>
        }
      </div>
    </>
  )
}