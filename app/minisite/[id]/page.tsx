import Main from "@/c/constructor/main";
import { PrismaClient } from "@prisma/client";
import type { Metadata } from 'next'
const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'Miniweb',
  description: 'Generated Mini Website',
}

export default async function Page({ params }: { params: any }) {
  const page = await getPage(params.id)

  if (!page) {
    return '404'
  }

  return (
    <>
      <Main
        siteid={params.id}
        author={page.author.email}
        initialContent={page.content || JSON.stringify({})} />
    </>
  )
}

async function getPage(id: number) {

  const page = await prisma.minisite.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: { email: true }
      }
    }
  })

  return page
}