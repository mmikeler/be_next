import { PAGE } from "@/c/page";
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
      <PAGE page={page} />
    </>
  )
}

async function getPage(id: number) {

  const page = await prisma.page.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: { name: true }
      }
    }
  })

  if (page) {
    const updatePage = await prisma.page.update({
      where: {
        id: Number(id),
      },
      data: {
        views: {
          increment: 1
        },
      },
    })
  }

  return page
}