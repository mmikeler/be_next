import { PrismaClient } from "@prisma/client"
import { Minisites__Header__Info } from "./client";
import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import { Site_Table_Element } from "./site_table_elem";
import Add_Site_Button from "./add_site_btn";

export default async function Minisites(params: any) {
  const sites = await getUserSites();

  return (
    <>
      <div className="mx-6 mb-2 mt-6">
        <Add_Site_Button counter={sites?.length} />
        <Minisites__Header__Info />
      </div>
      <div className="mx-6 grid md:grid-cols-2 lg:grid-cols-6 gap-2">
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
  const session: any = await auth();

  if (!session || !session?.user) return null;

  const sites = await new PrismaClient().minisite.findMany({
    where: {
      masterId: session.user.email
    },
    include: { master: true }
  })

  return sites
}