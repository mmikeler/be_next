import { Icon } from "@/src/c/ui/icon";
import Image from "next/image";
import Link from "next/link";


export default function Page(params: any) {
  const h = "my-4 text-xl text-center bg-slate-700 text-white py-2";
  return (
    <div
      style={{ background: 'url("/assets/bg2.jpg") no-repeat left top / cover' }}
      className="text-slate-700 min-h-screen">

      <div className="p-1 flex items-center border-b">
        <Link href={'/'}>
          <Image src={'/assets/logo.png'} width={40} height={40} alt="" />
        </Link>
        <div className="mx-auto text-xl">Минив3б</div>
      </div>

      <h2 className={`${h} mt-0`}>Магазин</h2>
      <p className="px-5">Сервис «Mинив3б» для оплаты своих услуг использует внутреннюю валюту. Пополнение счёта доступно в личном кабинете, при этом 1 рубль оплаты приравнивается к 1 рублю на счёте.</p>
      <p className="px-5 mt-2">Пополнение счёта возможно в рублях. Решение о возврате средств принимается в индивидуальном порядке при обращении в службу поддержку сервиса по любым контактам, указанным в соответствующем разделе.</p>

      <h2 className={h}>Контакты</h2>
      <div className="px-5">
        <b>Адрес:</b> Россия, Вологда, 160000 <br />
        <b>Телефон:</b> +7 933 348 44 68 <br />
        <b>Для связи:</b> Telegram @mmikeler <br />
        <b>Владелец:</b> Малышев Михаил Сергеевич <br />
        <b>ИНН:</b> 352536977909 <br />
      </div>

    </div>
  )
}