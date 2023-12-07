"use client"

import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserCtx = createContext(null)

export function Profile(params: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get('/api/user').then((res: any) => {
      setUser(res?.data?.result)
    })
  }, [])

  return (
    <UserCtx.Provider value={user}>
      {params.children}
    </UserCtx.Provider>
  )
}