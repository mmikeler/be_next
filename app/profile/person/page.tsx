import Main__Header from "@/c/profile/main_header";
import { Person__Widget, YaDiskConnectionWidget } from "../../../c/profile/profile/client";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

export default async function Person__Page() {
  const session: any = await getServerSession(handler);

  const result = await new PrismaClient().user.findFirst({
    where: {
      email: session?.user.email,
    }
  });

  return (
    <div className="">
      <Main__Header title={'Профиль'} />

      <div className="w-11/12 mx-auto">
        <Person__Widget title="Яндекс.Диск" tag="cloud">
          <YaDiskConnectionWidget token={result?.ya_disk} />
        </Person__Widget>
      </div>
    </div>
  )
}