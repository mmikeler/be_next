import Topbar from "@/c/topbar"
import { Breadcrumbs } from "@/c/ui/breadcrumbs"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Topbar />
      <div className="container mx-auto p-1 mt-16"><Breadcrumbs path={'/page'} /></div>
      <article className="container mx-auto border border-stone-300 mt-5 px-10 py-5 bg-stone-100 text-stone-900">
        {children}
      </article>
    </>
  )
}