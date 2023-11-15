"use client"

import Link from "next/link";
import { Icon } from "../ui/icon";
import { useEffect, useState } from "react";
import axios from "axios";

export function User__Score(params: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get('/api/user').then((res: any) => {
      setUser(res.data.result)
    })
  }, [])

  return (
    <Link href="/profile/points" className="flex items-center">
      <div className="text-sm">{user?.points}</div>
      <Icon tag="currency_ruble" />
    </Link>
  )
}