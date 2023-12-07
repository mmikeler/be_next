import prisma from "@/src/db/prisma"
import { random } from "lodash"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { auth } from "../auth/[...nextauth]/auth"

/**
 * Получаем данные сайта
 * @param request id: string
 * @returns User | null
 */
export async function GET(request: NextRequest) {
  const { id } = await request.json()

  const session = await auth();
  if (!prisma || !session) return;

  const result = await prisma.minisite.findUnique({
    where: {
      id: id
    }
  });

  return NextResponse.json({ result })
}

/**
 * Создаём новый сайт
 * Protected root
 */
export const POST = async (request: NextRequest) => {
  const { id } = await request.json()

  const session = await auth();
  if (!prisma || !session) return;

  // Ограничение на создание сайтов в 10
  let sitesCount = await prisma.minisite.findMany({
    where: {
      masterId: id
    }
  })

  if (sitesCount.length >= Number(process.env.NEXT_PUBLIC_SITE_LIMIT)) {
    return NextResponse.json({
      result: {
        error: 'Site limit',
        message: 'Достигнут лимит количества сайтов для Вашего аккаунта'
      }
    })
  }

  let result = await prisma.minisite.create({
    data: {
      masterId: id,
      authorId: id,
      slug: "ns_" + random(0, 1000000)
    }
  });

  if (result.id) {
    result = await prisma.minisite.update({
      where: {
        id: result.id,
      },
      data: { slug: "ns_" + result.id }
    });

  }

  return NextResponse.json({ result })
}

/**
 * Save site data
 * @param request id: string, options: object
 * @returns 
 */
export const PATCH = async (request: NextRequest) => {
  const { id, options } = await request.json()

  const session = await auth();
  if (!prisma || !session) return;

  // Если изменяется слаг, делаем проверку на уникальность
  if (options?.slug) {
    const result = await prisma.minisite.findUnique({
      where: {
        slug: options.slug
      }
    });
    if (result) {
      return NextResponse.json({ error: true, errorMessage: 'Такой адрес уже зарегистрирован' })
    }
  }

  //
  // TODO: Если ставим на публикацию, то списываем суточную таксу, при условии, что сегодня
  // 

  // Сохраняем данные
  const result = await prisma.minisite.update({
    where: {
      id: id,
      masterId: session?.user?.email || ""
    },
    data: options
  });

  return NextResponse.json({ result })
}

//
// Копируем сайт
//
export const PUT = async (request: NextRequest) => {
  const { masterId, authorId, title, slug, content } = await request.json()

  const session = await auth();
  if (!prisma || !session) return;

  let result = await prisma.minisite.create({
    data: {
      masterId: masterId,
      authorId: authorId,
      title: title + ' (копия)',
      slug: slug + '_copy',
      content: content
    }
  });

  return NextResponse.json({ result })
}