import Topbar from '@/src/c/topbar'
import Link from 'next/dist/client/link'
import { Icon } from '@/src/c/ui/icon'
import Image from 'next/image'

export default function Home() {
  const btnMod = 'mx-2 text-stone-100 rounded p-1 px-3 transition-all cursor-pointer';
  return (
    <>
      <main
        style={{ width: '360px' }}
        className="border relative min-h-screen mx-auto mb-5 overflow-x-hidden bg-white">

        <Topbar />

        <div
          className='m-auto px-3 pb-5 relative text-slate-700'>
          <div className="p-3 -mx-3 text-sm text-center bg-gray-100 text-stone-700">
            &quot;Создавайте свои маленькие большие шедевры с визуальным нешаблонным конструктором мини-сайтов. И управляйте ими со смартфона.&quot;
            <div className='text-end italic mt-2 text-xs'>Леонардо Давинчи, 2023 год н.э.</div>
          </div>
          <Image
            className='block mx-auto my-5'
            width={900}
            height={900}
            style={{
              width: "80%",
              height: "auto",
              maxWidth: "none",
            }}
            src={'/assets/mockup.png'} alt="miniw3b" />

          <div className="-mx-3 text-slate-500">

            <div className='p-3 flex item-center'>
              <Icon className="text-4xl" tag="layers" />
              <div className="ms-2">
                <strong>Понятная послойная структура</strong>
                <div className="text-sm">
                  Каждый объект - это отдельный слой со своими свойствами для настройки.
                </div>
              </div>
            </div>

            <div className='p-3 flex item-center'>
              <Icon className="text-4xl" tag="resize" />
              <div className="ms-2">
                <strong>Стабильные позиция и размеры объекта</strong>
                <div className="text-sm">
                  Создавайте без оглядки на адаптивность к разным размерам экрана. Ваша работа будет выглядеть одинаково на всех типах устройств.
                </div>
              </div>
            </div>

            <div className='p-3 flex item-center'>
              <Icon className="text-4xl" tag="playlist_add" />
              <div className="ms-2">
                <strong>Все самые необходимые объекты</strong>
                <div className="text-sm">
                  Блок, изображение, текст. Каждый объект имеет, кроме уникальных, настройки размеров, положения и цветов. Большинство объектов можно сделать ссылкой.
                </div>
              </div>
            </div>

            <div className='p-3 flex item-center'>
              <Icon className="text-4xl" tag="iframe" />
              <div className="ms-2">
                <strong>Встраивание доп. контента</strong>
                <div className="text-sm">
                  С помощью объекта встраивания можно добавить на ваш сайт дополнительный контент, например, формы, карты или кнопки оплаты.
                </div>
              </div>
            </div>

            <div className='p-3 flex item-center'>
              <Icon className="text-4xl" tag="timeline" />
              <div className="ms-2">
                <strong>Статистика и счётчики</strong>
                <div className="text-sm">
                  Вы можете установить свои счётчики посещений от Яндекс или Google, чтобы отслеживать нужную статистику.
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-center mt-5">
            <Link className={`${btnMod} bg-blue-500`} href="https://vk.com/public203449328">Вконтакте</Link>
            <Link className={`${btnMod} bg-blue-700`} href="https://t.me">Telegram</Link>
          </div>
        </div>

        <div className="w-full mt-3">
          <div className="bg-green-700 text-center text-stone-100 p-3 text-xl">
            Подходит для
          </div>
          <div className="p-3">
            Приглашение, опрос, объявление, афиша, информация об акции, портфолио, визитка, буклет, расписание, меню и подобное.
          </div>
        </div>

        <div className="w-full mt-3">
          <div className="bg-red-700 text-center text-stone-100 p-3 text-xl">
            НЕ подходит для
          </div>
          <div className="p-3">
            Сайтов, предполагающих большое кол-во контента текстового или визуального, таких как блог или интернет-магазин с большим количеством позиций.
          </div>
        </div>

        <div className="w-full mt-3">
          <div className="bg-slate-700 text-center text-stone-100 p-3 text-xl">
            Примеры работ
          </div>
          <div className="p-3 text-center text-blue-500">
            <Link className='flex items-center p-2' target='_blank' href="/m/ns_3">
              <Icon className="me-3" tag="open_in_new" />
              Приглашение на мастер-класс
            </Link>
            <Link className='flex items-center p-2' target='_blank' href="/m/ns_3">
              <Icon className="me-3" tag="open_in_new" />
              Приглашение на мастер-класс
            </Link>
          </div>
        </div>

        <div className="uppercase cursor-pointer rounded w-11/12 mt-10 mx-auto bg-sky-500 hover:bg-sky-700 transition-all text-white text-lg p-3 text-center">
          <span><Icon tag="person_play" /></span> начать творить бесплатно <span><Icon tag="person_play" /></span>
        </div>
        <div className="text-stone-400 text-center text-sm">
          Нажав кнопку Вы будете направлены на страницу регистрации, а затем в личный кабинет
        </div>

        <div className="mt-10 text-sm bg-gray-50 px-2 py-5 border-t text-blue-500">
          <Link className='block mt-2' href="/p/about" target='_blank'>
            <Icon className="me-3" tag="open_in_new" />
            О сервисе
          </Link>
        </div>

      </main>
    </>
  )
}
