import Link from "next/link";
import useStore from '@/src/store/store'
import LoginBtn from "@/src/c/ui/login-btn";

export function Copyright(params: any) {
  let author: string | undefined = useStore((state: any) => state?.author)
  let master: string | undefined = useStore((state: any) => state?.master)
  const slug = window.location.toString().split('/').pop();

  function prep(param: string | undefined) {
    return param ? param.split('@')[0] : 'Неизвестно';
  }

  return (
    <>
      <div className="rounded overflow-hidden mx-auto flex items-center text-xs w-fit">
        <div className="w-20 bg-slate-700 text-white p-1 px-2">Автор</div>
        <div className="bg-stone-100 text-slate-700 p-1 px-2 border">{prep(author)}</div>
      </div>
      <div className="rounded overflow-hidden mx-auto mt-2 mb-5 flex items-center text-xs w-fit">
        <div className="w-20 bg-slate-700 text-white p-1 px-2">Владелец</div>
        <div className="bg-stone-100 text-slate-700 p-1 px-2 border">{prep(master || author)}</div>
      </div>

      <div
        style={{ width: '360px' }}
        className="flex items-stretch bg-stone-50 mx-auto mb-6 text-xs text-center text-stone-500 border">

        <div className="p-2">
          <div className="ms-2">Веб-страница создана и размещёна при помощи <Link className='underline hover:text-lime-600' target='_blank' href="https://miniw3b.ru">Miniw3b</Link></div>

          <div className="mt-2">
            <Link className="text-green-500 mx-2" href={`/p/iwant?target=${slug}`}>Хочу такой же</Link>
            <Link className="text-red-500 mx-2" href="/p/about#contacts">Пожаловаться</Link>
          </div>
        </div>

        <div className="flex ms-auto border-l p-2">
          <div className="m-auto w-fit">
            <LoginBtn />
          </div>
        </div>

      </div>
    </>
  )
}