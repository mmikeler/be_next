import { useContext } from "react";
import { UserCtx } from "../../profile";
import { Dashboard__Card } from "../dashboard";


export default function Dashboard__MainInfo() {
  const user: any = useContext(UserCtx)
  if (!user) return null;

  const stat = {
    sites: 0,
    public: 0,
    close: 0,
  }

  user.sites.forEach((s: any) => {
    stat.sites++;
    s.published ? stat.public++ : stat.close++;
  })

  return (
    <Dashboard__Card title="Сайты">
      <div className="flex items-end">
        <div className="text-center w-full">
          <div className="text-xl">{stat.sites}</div>
          <div className="text-xs">Всего сайтов</div>
        </div>
        <div className="text-center w-full text-lime-700">
          <div className="text-4xl">{stat.public}</div>
          <div>Включено</div>
        </div>
        <div className="text-center w-full text-red-700">
          <div className="text-xl">{stat.close}</div>
          <div className="text-xs">Отключено</div>
        </div>
      </div>
    </Dashboard__Card>
  )
}