import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { YaDisk } from "ya-disk-rest-api";
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { handler } from "../auth/[...nextauth]/route";
import axios from "axios";

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { options } = await request.json()
  const session: any = await getServerSession(handler);

  const user = await prisma.user.findFirst({
    where: {
      email: options.author || session?.user.email,
    }
  });

  const disk = new YaDisk(user?.ya_disk || '')

  const res = await disk.getItemMetadata({
    path: options.path.replace('disk:/Приложения/Минивеб.Диск/', 'app:/')
  })
  await prisma.$disconnect()
  return NextResponse.json({ res })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')?.replace('disk:/Приложения/Минивеб.Диск/', 'app:/')
  const author = searchParams.get('author')

  if (path && author) {
    const user = await prisma.user.findFirst({
      where: {
        email: author,
      }
    });
    await prisma.$disconnect()

    if (user) {

      let config = {
        headers: {
          Authorization: `OAuth ${user?.ya_disk}`,
          ContentType: 'application/json'
        }
      }

      const image = await axios.get(
        'https://cloud-api.yandex.net/v1/disk/resources?path='
        + path.replace('disk:/Приложения/Минивеб.Диск/', '')
        + '&preview_size=500x',
        config
      )

      return NextResponse.json(image.data)
    }
    else {
      return NextResponse.json({ path, author })
    }
  }
  return NextResponse.json({ path, author })
}