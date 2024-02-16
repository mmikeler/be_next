import { General__Textarea, General__Widget } from "../site_options";

export default function General__Meta(params: any) {
  return (
    <General__Widget title="Meta">

      <div className="border-l-4 p-2 italic text-xs font-thin">
        Данный раздел позволяет менять контент мета-полей в шапке страницы
      </div>

      <General__Textarea
        propName="description"
        min={120}
        max={190}
        note={'Описание содержимого страницы. Не злоупотребляйте ключевыми словами. О главном пишите в начале. Оптимальное количество символов 120-190.'}
      />

    </General__Widget>
  )
}