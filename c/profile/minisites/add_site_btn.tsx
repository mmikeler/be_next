"use client"

import { Delayer } from "@/c/ui/delay_animate";
import { Icon } from "@/c/ui/icon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";


export default function Add_Site_Button() {
  const { data: session } = useSession()
  const [delay, setDelay] = useState(false);
  const { push } = useRouter();

  const addSite = async () => {
    if (session && session.user) {
      setDelay(true)
      await axios.post('/api/minisites', { id: session.user.email });
      window.location.reload()
    }
    else {
      alert('Ошибка')
    }
  }

  return (
    <div
      onClick={delay ? () => { } : addSite}
      className="pe-4 ps-2 py-2 w-fit uppercase text-stone-100 flex items-center bg-green-600 text-xs rounded hover:bg-green-700 cursor-pointer ms-auto transition-all">
      {!delay ?
        <>
          <Icon className="text-xl m-auto" tag={'add'} />
          Добавить сайт
        </>
        :
        <>
          <Delayer />
          Обработка
        </>
      }
    </div>
  )
}