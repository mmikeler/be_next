import { useEffect, useState } from "react";
import { General__Widget } from "../site_options";
import { sanitizeHTML } from "@/src/c/profile/minisites/client";
import axios from "axios";
import { toast } from "react-toastify";
import useStore from "@/src/store/store";
import { CopyToClipboardBtn } from "@/src/c/ui/copy_btn";


export default function General__Head(params: any) {
  const siteID = useStore((state: any) => state.siteid);
  const [title, setTitle] = useState(document.title);
  const [slug, setSlug] = useState(window.location.href.split('/').pop());
  const [meta, setMeta] = useState<any>({});

  const fixedTitle = (e: any) => {
    setMeta({ ...meta, [e.target.name]: e.target.value })
    try {
      // Сохраняем в БД
      axios.patch('/api/minisites', {
        id: Number(siteID),
        options: {
          [e.target.name]: sanitizeHTML(e.target.value || '')
        }
      });
    } catch (error) {
      toast.error('Ошибка. Настройки не сохранились.');
    }
  }

  const fixedProp = (e: any) => {
    try {
      // Сохраняем в БД
      axios.patch('/api/minisites', {
        id: Number(siteID),
        options: {
          [e.target.name]: sanitizeHTML(e.target.value || '')
        }
      });
    } catch (error) {
      toast.error('Ошибка. Настройки не сохранились.');
    }
  }

  const fixedSlug = async (e: any) => {
    const s = slug?.toLowerCase()
    if (s) {
      try {
        // Сохраняем в БД
        axios.patch('/api/minisites', {
          id: Number(siteID),
          options: {
            slug: sanitizeHTML(s)
          }
        })
          .then(res => {
            if (res.data.error) {
              alert(res.data.errorMessage)
            }
            else {
              if (confirm('Адрес прошёл проверку. Сейчас вы будете перенаправлены на новый адрес.')) {
                window.location.href = '/m/' + res.data.result.slug
              }
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert('Недопустимое значение')
    }
  }

  useEffect(() => {
    document.title = title;
  }, [title])

  useEffect(() => {
    const meta: any = {};
    const metaTags = document.head.getElementsByTagName('meta');

    for (let i = 0; i < metaTags.length; i++) {
      const name = metaTags[i].getAttribute('name') || '';
      const content = metaTags[i].getAttribute('content');
      meta[name] = content;
    }

    setMeta(meta);
  }, [])

  return (
    <General__Widget title="Head">

      <label className="text-sm w-full block">
        <div>Title</div>
        <input
          onBlur={fixedTitle}
          className="p-1 text-slate-700 w-full"
          type="text"
          name="title"
          defaultValue={title} />
        <div className="text-xs text-stone-300 pt-1">
          Отображается на вкладке браузера
        </div>
      </label>

      <label className="text-sm w-full mt-3 block">
        <div>Slug</div>
        <div className="flex">
          <input
            className="p-1 w-[125px] text-xs"
            type="text"
            value={'https://miniw3b.ru/m/'}
            disabled />
          <input
            onInput={(e: any) => setSlug(e.target.value.toLowerCase().replace(' ', '_'))}
            onBlur={fixedSlug}
            className="p-1 text-slate-700 w-full"
            type="text"
            name="slug"
            value={slug} />
          <CopyToClipboardBtn content={'https://miniw3b.ru/m/' + slug} />
        </div>
        <div className="text-xs text-stone-300 pt-1">
          Адрес ссылки на этот сайт
        </div>
      </label>

    </General__Widget>
  )
}