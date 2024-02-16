import { createFont } from "@/src/actions/create_font";
import { useState } from "react";
import { toast } from "react-toastify";

export function AddFontForm() {
  const [file, setFiles] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const onsubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);

    if (file.name.match(/.otf|.woff|.woff2/)) {
      if (await createFont(data)) {
        toast.success('Шрифт добавлен');
        setFiles(null);
        e.target.reset();
      }
      else {
        toast.error('Ошибка при добавлении шрифта');
      }
    }
    else {
      setError('Недопустимый формат файла');
    }
  }

  return (
    <>
      <form onSubmit={onsubmit}>

        {!file || error ?
          <>
            <label
              htmlFor="addFont"
              className="cursor-pointer border-2 border-stone-500 rounded bg-slate-700 text-xs w-full block text-center p-2">
              Здесь Вы можете выбрать и загрузить свой шрифт. Перед загрузкой шрифта проверьте нет ли его в списке ниже.
            </label>

            {error && <div className="text-red-500 text-xs">{error}</div>}

            <input
              onChange={(e) => {
                setFiles(e.target.files?.[0]);
                setError(null);
              }}
              className="absolute -z-10 opacity-0" name="font" type="file" id="addFont" />
          </>
          :
          <div className="text-xs">Вы выбрали {file.name}</div>
        }

        {file &&
          <button className="bg-sky-500 text-white p-2 w-full my-2 rounded">
            Загрузить
          </button>
        }
      </form>
    </>
  )
}