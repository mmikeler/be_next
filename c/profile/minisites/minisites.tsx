import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next";
import Add_Site_Button, { Site_Table_Element } from "./client";
import { handler } from "@/app/api/auth/[...nextauth]/route";


export default async function Minisites(params: any) {
  const sites = await getUserSites()

  return (
    <>
      <div className="mx-6 mb-2 mt-6 flex">
        <Add_Site_Button />
      </div>
      <div className="mx-6">
        {sites ?
          sites?.map((s, ind) => {
            return <Site_Table_Element data={s} key={ind} />
          })
          : <div className="m-6">Нет сайтов</div>
        }
      </div>
    </>
  )
}

async function getUserSites() {
  const session: { user: any } | null = await getServerSession(handler)

  if (session) {
    const sites = await new PrismaClient().minisite.findMany({
      where: {
        authorId: session.user.email
      },
      include: { author: true }
    })

    return sites
  }

  return null
}