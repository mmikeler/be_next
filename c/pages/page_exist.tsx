"use client"

import Link from "next/link"

export default function Page__Exist({ page }: any) {
    const { id, title, content, created } = page

    return (
        <div key={id} className="mt-3 p-3 border rounded bg-slate-100">
            <h2 className="text-xl">{title}</h2>
            <p>{content || <i>Нет контента</i>}</p>
            <Link className="text-blue-500 text-xs text-end w-full block hover:underline" href={'/page/' + id}>Подробнее</Link>
        </div>
    )
}