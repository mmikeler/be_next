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
  const users = await getUsers();
  return (
    <>
      <ADMIN__Users users={users} />
    </>
  )
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