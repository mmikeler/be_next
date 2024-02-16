import { toast } from "react-toastify";
import { Icon } from "./icon";


export function CopyToClipboardBtn(params: {
  content: string,
  mod?: string
}) {

  const { content, mod } = params;

  const copy = () => {
    const copyPromise = navigator.clipboard.writeText(content);
    toast.promise(copyPromise, {
      pending: 'Копирование...',
      error: 'Ошибка. Попробуйте ещё раз.',
      success: 'Скопировано в буфер обмена!'
    })
  }

  return (
    <div
      onClick={copy}
      className={`self-center ms-2 icon text-2xl cursor-pointer hover:text-lime-500 ${mod}`}>
      <Icon tag="content_copy" />
    </div>
  )
}