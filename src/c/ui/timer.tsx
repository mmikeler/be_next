import axios from "axios";
import { useEffect, useState } from "react";
import { Layer } from "../models/layer";
import moment from "moment";
import { useCountdown } from "@/src/hooks/countdown";


export function Timer({ data }: {
  data: Layer
}) {
  const [days, hours, minutes, seconds] = useCountdown(
    new Date(
      new Date(data?.timer?.date).getTime()
      + Number(data?.timer?.time)
      * 1000 * 60 * 60
    )
  );
  const t = data.timer;

  return (
    <div className={`w-full h-full flex ${data.fontClass || ''}`}>
      <div className="m-auto flex items-center">
        {
          days + hours + minutes + seconds <= 0 ?

            t.endText || 'Началось!'

            :
            <>
              {data.timer.parts.days &&
                <>
                  <span className="text-center">
                    {days < 10 ? '0' + days : days}
                    {t.parts.text && <Timer_Partext text="Дни" />}
                  </span>
                  <span className="mx-[0.3em]">{data.timer.delimeter}</span>
                </>
              }
              {data.timer.parts.hours &&
                <>
                  <span className="text-center">
                    {hours < 10 ? '0' + hours : hours}

                    {t.parts.text && <Timer_Partext text="Часы" />}
                  </span>
                  <span className="mx-[0.3em]">{data.timer.delimeter}</span>
                </>
              }
              {data.timer.parts.minutes &&
                <>
                  <span className="text-center">
                    {minutes < 10 ? '0' + minutes : minutes}
                    {t.parts.text && <Timer_Partext text="Минуты" />}
                  </span>
                  {data.timer.parts.seconds &&
                    <span className="mx-[0.3em]">{data.timer.delimeter}</span>}
                </>
              }
              {data.timer.parts.seconds &&
                <>
                  <span className="text-center">
                    {seconds < 10 ? '0' + seconds : seconds}
                    {t.parts.text && <Timer_Partext text="Секунды" />}
                  </span>
                </>
              }
            </>
        }
      </div>
    </div>
  )
}

function Timer_Partext(params: any) {

  return (
    <span className="block text-[0.35em] uppercase text-center">{params.text}</span>
  )
}