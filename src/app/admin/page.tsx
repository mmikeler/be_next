import { ADMIN__Users } from '@/src/c/ADMIN/users';
import LoginBtn from '@/src/c/ui/login-btn';
import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'Miniw3b Admin',
}

export default async function Page() {
  const user: any = await getUser()

  if (user && user.role == 'Admin' || user.role == 'Superadmin') {
    const users = await getUsers();
    return (
      <>
        <div className="bg-slate-900 flex items-center p-1 text-white">
          <Link href={'/'}>
            <Image
              src={'/assets/logo.png'}
              width={40}
              height={40}
              alt="miniw3b"
            />
          </Link>
          <div className="mx-auto text-xl">Miniw3b.Admin</div>
          <LoginBtn />
        </div>
        <div className="mx-auto bg-slate-700 text-white overflow-x-auto min-h-screen">
          <ADMIN__Users users={users} />
        </div>
      </>
    )
  }
  else {
    return 'Доступ запрещён';
  }

}

async function getUser() {
  const session: any = await getServerSession()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  return user
}

async function getUsers() {
  return await prisma.user.findMany({
    include: {
      _count: {
        select: {
          sites: true,
          forms: true,
          payments: true,
        }
      }
    }
  })
}