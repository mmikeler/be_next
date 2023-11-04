import { PrismaClient } from "@prisma/client"
import { random } from "lodash"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { id } = await request.json()

  const result = await prisma.minisite.findUnique({
    where: {
      id: id
    }
  });

  return NextResponse.json({ result })
}

export async function POST(request: NextRequest) {
  const { id } = await request.json()

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

export async function PATCH(request: NextRequest) {
  const { id, options } = await request.json()

  // Если изменяется слаг, делаем проверку на уникальность
  if (options?.slug) {
    const result = await prisma.minisite.findUnique({
      where: {
        slug: options.slug,
      }
    });
    if (result) {
      return NextResponse.json({ error: true, errorMessage: 'Такой адрес уже зарегистрирован' })
    }
  }
  // Сохраняем данные
  const result = await prisma.minisite.update({
    where: {
      id: id,
    },
    data: options
  });

  return NextResponse.json({ result })
}