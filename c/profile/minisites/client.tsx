"use client"

import { Icon } from "@/c/ui/icon"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useContext } from "react"
import { UserCtx } from "../profile"
import { Alert } from "@/c/ui/alert"

export default function Add_Site_Button() {
  const { data: session } = useSession()

  const addSite = () => {
    if (session && session.user)
      axios.post('/api/minisites', { id: session.user.email })
    else
      alert('Ошибка')
  }

  return (
    <div
      onClick={addSite}
      className="pe-4 ps-2 py-2 w-fit uppercase text-stone-100 flex items-center bg-green-600 text-xs rounded hover:bg-green-700 cursor-pointer ms-auto transition-all">
      <Icon className="text-xl h-6 w-6" tag={'add'} />
      Добавить сайт
    </div>
  )
}

export function Minisites__Header__Info() {
  const user: any = useContext(UserCtx)

  if (user?.points < 5) {
    return (
      <Alert className="my-2 flex" type="warning">
        <Icon className="text-4xl mr-3 text-red-400" tag="lock" />
        Сайт(ы) были отключены из-за недостатка средств. Пополните счёт, чтобы снова их включить.</Alert>
    )
  }
}

export function parseProp(str: String) {
  const numberPattern = /\d+/g;
  const match = str?.match(numberPattern)
  return Number(match && match[0]) || 0
}

/*
============== FONTS
*/
export function getBaseFontUrl(params: any) {
  const { title, wght } = params.font
  return `https://fonts.googleapis.com/css2?family=${title}:wght@${wght}&display=swap`
}

export function BaseFontLink(params: any) {
  return `<link href="${getBaseFontUrl(params.font)}" rel="stylesheet">`
}

/**
 * UTIL
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function sanitize(el: any) {

  var ALLOWED_TAGS = ["STRONG", "EM", "B"]; // !!!

  var tags = Array.prototype.slice.apply(el.getElementsByTagName("*"), [0]);
  for (var i = 0; i < tags.length; i++) {
    console.log(tags[i].nodeName);

    if (ALLOWED_TAGS.indexOf(tags[i].nodeName) == -1) {
      usurp(tags[i]);
    }
  }
}
function usurp(p: any) {
  var last = p;
  for (var i = p.childNodes.length - 1; i >= 0; i--) {
    var e = p.removeChild(p.childNodes[i]);
    p.parentNode.insertBefore(e, last);
    last = e;
  }
  p.parentNode.removeChild(p);
}
export function sanitizeHTML(s: string) {
  var div = document.createElement("div");
  div.innerHTML = s;
  sanitize(div);
  return div.innerHTML;
}