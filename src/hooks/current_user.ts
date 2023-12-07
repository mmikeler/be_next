import { useSession } from "next-auth/react";

export type User = {
  id?: number,
  email?: string | null | undefined,
  name?: string | null | undefined,
  created?: Date,
  last_login?: Date,
  role?: string,
  ya_disk?: string,
  sites?: object,
  forms?: object,
  payments?: object,
  points?: number,
  last_pay?: Date,
  strikes?: number,
  baned?: Date | null,
  image?: string | null | undefined,
}

export function useCurrentUser() {
  const { data: session } = useSession();
  const user: User = { ...session?.user };

  return user;
}