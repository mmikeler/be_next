import { useContext } from "react";
import { UserCtx } from "../../profile";
import { Dashboard__Card } from "../dashboard";
import { AppContext } from "@/src/c/app";
import moment from "moment";
import Link from "next/link";
import { floor, round } from "lodash";


export default function Dashboard__PayInfo() {
  const user: any = useContext(UserCtx);
  const SO: any = useContext(AppContext);
  const tax = Number(SO.daily_cost);


  // Считаем статистику
  const stat = {
    sites: 0,
    public: 0,
    close: 0,
  }
  user && user.sites.forEach((s: any) => {
    stat.sites++;
    s.published ? stat.public++ : stat.close++;
  })

  const total = round(stat.public * tax);
  const daysTo = user ? floor(user.points / total) : false;
  const lastDayDate = daysTo ? moment(new Date().setDate(new Date().getDate() + daysTo)).format('DD.MM.YYYY') : 'не известно';

  // Если данных юзера нет, выходим.
  if (!user) return null;

  return (
    <Dashboard__Card title="Содержание">
      <div className="grid grid-cols-2">
        {/* User data */}
        <span>Логин:</span><span>{user.name}</span>
        <span>ID Пользователя:</span><span>{user.id}</span>
        {/* Pay data */}
        <span>Оплаченных дней:</span>
        <span>
          <Link className="text-sky-500" href="/profile/points">{daysTo}</Link>
        </span>

        <span>Аренда:</span>
        <span>
          <Link className="text-sky-500" href="/profile/points">{total} ₽/день</Link>
        </span>

        <span>Дата блокировки:</span>
        <span>
          <Link className="text-sky-500" href="/profile/points">{lastDayDate}</Link>
        </span>
      </div>
    </Dashboard__Card>
  )
}