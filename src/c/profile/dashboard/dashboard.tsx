"use client"

import Dashboard__MainInfo from "./cards/main_info"
import Dashboard__PayInfo from "./cards/pay_info"

export default function Dashboard() {

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-5">
      <Dashboard__MainInfo />
      <Dashboard__PayInfo />
    </div>
  )
}

// Обёртка для блоков dashboard
export function Dashboard__Card(params: any) {

  return (
    <div className="card bg-gray-50 border border-slate-300 rounded overflow-hidden">
      <div className="card__header px-3 py-2 bg-gray-100 border-b border-gray-300 text-xs uppercase">
        {params.title}
      </div>
      <div className="card__body p-3 text-sm">
        {params.children}
      </div>
    </div>
  )
}