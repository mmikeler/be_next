import { ADMIN__Pages } from '@/src/c/ADMIN/sites';
import { Alert } from '@/src/c/ui/alert';
import prisma from '@/src/db/prisma';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Miniw3b Admin',
}

export default async function Page() {
  const sites = await getSites();

  if (sites) {
    return <ADMIN__Pages sites={sites} />;
  }

  return <Alert type="warning">Ошибка получения данных</Alert>

}

async function getSites() {
  return await prisma?.minisite.findMany();
}