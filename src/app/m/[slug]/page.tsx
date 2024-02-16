import Main from '@/src/c/constructor/main';
import { Icon } from '@/src/c/ui/icon';
import prisma from '@/src/db/prisma';
import { getServerSession } from 'next-auth';

export default async function Page({ params }: { params: any }) {
  const page = await getPage(params.slug);
  const session = await getServerSession();
  const isUserTheAuthor = session?.user?.email === page?.masterId;

  if (!page) {
    return '404'
  }

  return (
    <>
      {
        (page.published && page.master.points > 0) || isUserTheAuthor
          ?
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

  const page = await prisma?.minisite.findUnique({
    where: { slug: slug },
    include: {
      master: {
        select: {
          points: true,
          email: true,
        }
      }
    }
  })

  return page
}

// or Dynamic metadata
export async function generateMetadata({ params }: { params: any }) {
  const page = await getPage(params.slug);
  const content = JSON.parse(page?.content || JSON.stringify({}));
  const meta: any = {
    metadataBase: new URL('https://miniw3b.ru'),
    title: page?.title || 'Miniw3b',
    description: content.meta?.description,
    generator: 'Miniw3b - Awesome Webpage Builder',
    applicationName: 'Miniw3b',
    referrer: 'origin-when-cross-origin',
    alternates: {
      canonical: '/m/' + page?.slug,
    },
    openGraph: {
      title: page?.title || 'Miniw3b',
      description: content.meta?.description,
      type: 'article',
      publishedTime: page?.created,
      authors: ['Miniw3b'],
      url: '/m/' + page?.slug,
      siteName: page?.title || 'Miniw3b',
      images: [
        {
          url: '/assets/logo.png',
          width: 512,
          height: 512,
        }
      ],
      locale: 'ru_RU',
    },
  }

  return meta;
}