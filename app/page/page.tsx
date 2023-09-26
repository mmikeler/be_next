import Page__Exist from "@/c/pages/page_exist"
import { PrismaClient } from "@prisma/client"

export default async function Page(params: any) {
  const pages = await getPages()
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl">Список страниц</h1>
      {
        pages.map((page, ind) => {
          return <Page__Exist key={ind} page={page} />
        })
      }
    </div>
  )
}

export async function getPages() {
  const pages = await new PrismaClient().page.findMany()

  if (!pages) {
    throw new Error('Failed to fetch data')
  }

  return pages
}

function ListItem(params: any) {

}