import { YaDisk } from "ya-disk-rest-api";
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { auth } from "../auth/[...nextauth]/auth";
import axios from "axios";
import prisma from "@/src/db/prisma";
import { Session } from "next-auth";

export async function POST(request: NextRequest) {
  const { options } = await request.json()

  const session: Session | null = await auth();
  if (!prisma || !session || !session?.user) {
    return NextResponse.json({ error: 'Доступ к операции запрещён' })
  };

  const user = await prisma.user.findFirst({
    where: {
      email: options.author || session?.user.email,
    }
  });

  const disk = new YaDisk(user?.ya_disk || '')

  const res = await disk.getItemMetadata({
    path: options.path.replace('disk:/Приложения/Miniw3b/', 'app:/'),
    limit: 10000
  })
  return NextResponse.json({ res })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')?.replace('disk:/Приложения/Miniw3b/', 'app:/')
  const author = searchParams.get('author')
  const size = searchParams.get('size')

  const session = await auth();
  if (!prisma || !session) {
    return NextResponse.json({ error: 'Доступ к операции запрещён' })
  };

  if (path && author) {
    const user = await prisma.user.findUnique({
      where: {
        email: author,
      }
    });

    let config = {
      headers: {
        Authorization: `OAuth ${user?.ya_disk}`,
      },
      //responseType: 'arraybuffer'
    }

    // const imaged = await axios.get(
    //   'https://фотошеф.рф/mw_media?path='
    //   + path
    //     .replace('disk:/Приложения/Минивеб.Диск/', 'app:/')
    //   + '&key=' + user?.ya_disk,
    //   { responseType: 'arraybuffer' }
    // )

    const image = await axios.get(
      'https://cloud-api.yandex.net/v1/disk/resources?path='
      + path.replace('disk:/Приложения/Miniw3b/', '')
      + '&preview_size=500x',
      config
    )

    const content = await axios.get(
      image.data.sizes[size || 0].url,
      {
        headers: {
          Authorization: `OAuth ${user?.ya_disk}`,
        },
        responseType: 'arraybuffer'
      }
    )

    const contentType = image.headers['content-type'];
    const base64String = `data:${contentType};base64,${Buffer.from(content.data, 'binary').toString('base64')}`;

    return NextResponse.json(base64String)

  }
  else {
    return NextResponse.json({ path, author })
  }
}