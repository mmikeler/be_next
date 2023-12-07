"use client"

import { Delayer } from "@/src/c/ui/delay_animate";
import { Icon } from "@/src/c/ui/icon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Alert } from "../../ui/alert";

export default function Add_Site_Button({ counter }: { counter: number | undefined }) {
  const { data: session } = useSession();
  const [delay, setDelay] = useState(false);
  const limit = Number(process.env.NEXT_PUBLIC_SITE_LIMIT);
  const isLimitOver = Number(counter) >= limit;

  const addSite = async () => {
    if (session && session.user) {
      setDelay(true)
      const result = await axios.post('/api/minisites', { id: session.user.email });

      if (result.data.result.error) {
        alert(result.data.result.message);
        setDelay(false);
        return;
      }

      if (result.data.result.id) {
        window.location.reload();
        return;
      }

      alert('Ошибка');
    }
    else {
      alert('Ошибка');
    }
    setDelay(false);
  }

  return (
    <div className="flex items-center">
      <div className="ms-auto me-3 text-white text-xs">
        {counter}/{limit}
      </div>
      {isLimitOver ?

        <Alert type="warning">Вы достигли лимита кол-ва сайтов для Вашего аккаунта.</Alert>

        : <div
          onClick={delay ? () => { } : addSite}
          className="pe-4 ps-2 py-2 w-fit uppercase text-stone-100 flex items-center bg-green-600 text-xs rounded hover:bg-green-700 cursor-pointer transition-all">
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
        </div>}
    </div>
  )
}