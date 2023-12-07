import { Forbidden__Page } from "@/src/c/pages/forbidden";
import { auth } from "../api/auth/[...nextauth]/auth";


export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isAuth = await auth();
  if (!isAuth) {
    return <Forbidden__Page />
  }

  return (
    <>
      {children}
    </>
  )
}