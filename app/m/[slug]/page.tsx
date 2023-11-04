import Main from '@/c/constructor/main';
import { PrismaClient } from "@prisma/client";
import Head from 'next/head';
const prisma = new PrismaClient()

export default async function Page({ params }: { params: any }) {
  const page = await getPage(params.slug)

  if (!page) {
    return '404'
  }

  return (
    <>
      <Main
        siteid={page.id.toString()}
        author={page.masterId}
        initialContent={page.content || JSON.stringify({})} />
    </>
  )
}

async function getPage(slug: string) {

  const page = await prisma.minisite.findUnique({
    where: { slug: slug },
    include: {
      master: {
        select: { email: true }
      }
    }
  })

  return page
}

// or Dynamic metadata
export async function generateMetadata({ params }: { params: any }) {
  const page = await getPage(params.slug)
  return {
    title: page?.title || 'Miniw3b',
  }
}