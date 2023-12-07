import Main from '@/src/c/constructor/main';
import { Icon } from '@/src/c/ui/icon';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function Page({ params }: { params: any }) {
  const page = await getPage(params.slug)

  if (!page) {
    return '404'
  }

  return (
    <>
      {page.published && page.master.points > 0 ?
        <Main
          siteid={page.id.toString()}
          author={page.masterId}
          initialContent={page.content || JSON.stringify({})} />
        :
        <div style={{ width: '360px' }} className="flex mx-auto h-screen bg-slate-700 text-stone-300">
          <div className="m-auto text-center">
            <Icon className="text-8xl mx-auto block" tag="lock" />
            <div className="mt-10">
              Сайт по этому адресу сейчас закрыт.
            </div>
          </div>
        </div>
      }
    </>
  )
}

async function getPage(slug: string) {

  const page = await prisma.minisite.findUnique({
    where: { slug: slug },
    include: {
      master: {
        select: {
          points: true,
          email: true
        }
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