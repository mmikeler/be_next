"use client"

import Script from "next/script";
import { Icon } from "../../ui/icon";
import { useEffect, useState } from "react";
import axios from "axios";


export function Pay__Form(params: any) {
  const [summ, setSumm] = useState<number>(0);
  const [value, setValue] = useState<number>(100);
  const [pay, setPay] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [preload, setPreload] = useState<boolean>(false);

  useEffect(() => {
    if (summ >= 100 && summ <= 10000) {
      setPreload(true)
      axios.post('/api/pay/create', {
        summ: summ
      })
        .then((res: any) => {
          if (res.data?.id) {
            setPay(res.data)
          }
        })
        .catch(error => console.log(error))
    }
    else {
      !error && summ !== 0 && setError('Минимальная сумма 100 рублей')
    }

    return () => setPreload(false)
  }, [summ])

  useEffect(() => {
    if (pay) {
      const checkout = new (window as any).YooMoneyCheckoutWidget({
        confirmation_token: pay.confirmation.confirmation_token, //Токен, который перед проведением оплаты нужно получить от ЮKassa
        return_url: window.location.origin + `/profile/points/end?id=` + pay.id, //Ссылка на страницу завершения оплаты, это может быть любая ваша страница
        error_callback: function (error: any) {
          alert('Не удалось завершить оплату')
        }
      });

      //Отображение платежной формы в контейнере
      checkout.render('payment-form');
    }
  }, [pay])

  return (
    <>
      <Script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js" />

      {!pay ?
        <div
          className="mx-auto bg-gray-100 w-80 max-w-full text-slate-700 mt-20 rounded border border-gray-300">

          <div className="text-center p-3 border-b border-gray-400 bg-gray-300">
            Введите сумму пополнения
          </div>

          <div className="p-5 flex flex-col">
            <div className="m-auto w-fit text-6xl text-gray-500">
              <Icon tag="account_balance_wallet" />
            </div>

            <div className="flex flex-col justify-center">
              <input
                onFocus={() => setError(null)}
                onChange={(e: any) => {
                  e.target.value >= 100 ? setValue(e.target.value) : setValue(100)
                }}
                className="rounded border p-2 mx-auto block w-32 text-center"
                type="number"
                min={100}
                max={10000}
                value={value} />

              {error ? <div className="my-5 bg-red-100 p-3 text-xs text-center border-l-4 border-red-500">
                {error}
              </div> : null}

              <div
                onClick={() => { !preload && setSumm(value) }}
                className="cursor-pointer mt-5 rounded bg-green-700 w-fit text-white text-center px-4 py-1 mx-auto">
                {preload ? 'Обработка...' : 'Далее'}
              </div>
            </div>
          </div>


        </div>
        : null}

      {pay ?

        <div
          style={{
            background: "url('/assets/bg2.jpg') no-repeat center / cover",
            maxWidth: '500px'
          }}
          className="mx-auto w-10/12 text-slate-700 mt-20 p-5 rounded border"
          id="payment-form"></div>

        : null}
    </>
  )
}